<?php
namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Http\Requests\BookingPaymentSessionRequest;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\EmailCheckerRequest;
use App\Http\Requests\UnregisteredUserRequest;
use App\Models\PlaceCategory;
use App\Models\Refund;
use App\Models\ThemeCategory;
use App\Models\Transaction;
use App\Models\UnregisteredUser;
use App\Models\Venue;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Luigel\Paymongo\Facades\Paymongo;
use Illuminate\Support\Facades\Session;
use Illuminate\Database\Query\JoinClause;

class BookingController extends Controller
{
    public function view(Request $request){
        $venues = DB::table('venues')
        ->join('venue_landing_photos', function(JoinClause $join){
            $join->on('venues.id', '=', 'venue_landing_photos.venue_id');
        })->join('theme_categories', function(JoinClause $join){
            $join->on('venues.theme_category', '=', 'theme_categories.id');
        })->join('place_categories', function(JoinClause $join){
            $join->on('venues.place_category', '=', 'place_categories.id');
        })->select('venues.*', 'venue_landing_photos.photo_url', 'theme_categories.name as theme_name', 'theme_categories.image as theme_cover', 'place_categories.name as place_name')
        ->get(['id', 'venue_name', 'limit', 'price', 'theme_name', 'place_name', 'photo_url']);
        $transactions = DB::table('transactions')->where('transaction_status', '!=', TransactionStatusEnum::CANCELLED)->get();
        $place_categories = PlaceCategory::all('id', 'name');
        $theme_categories = ThemeCategory::all('id', 'name');
        $payload = [
            'venues' => $venues,
            'session' => $request->session()->get('contact_info'),
            'transactions' => $transactions,
            'place_categories' => $place_categories,
            'theme_categories' => $theme_categories
        ];
        
        return Inertia::render('Guest/Booking', $payload);

    }

    public function emailCheck(EmailCheckerRequest $request) {
        $validatedData = $request -> validated();
        
        $fetchedEmail = DB::table("unregistered_users")->where("email", "=", $request->email)->first();
        if($fetchedEmail == null){
            $request->session()->put('contact_info', $validatedData);
        } else {
            $fetchedUser = UnregisteredUser::find($fetchedEmail->id);

            $latestTransaction = DB::table('transactions')->where('customer_id', '=', $fetchedUser->id)->latest('start_date')->where('transaction_status', '=', 'paid')->whereDate('start_date', '>', Carbon::now()->format('Y-m-d'))->first();
            if ($latestTransaction != null){
                $request->session()->put('contact_info', $fetchedEmail);
                $request->session()->put('latest_transaction', $latestTransaction);
                return to_route('booking.customerViewBooking', $latestTransaction->id);
            } else{
                
                session()->forget('latest_transaction');
                $request->session()->put('contact_info', $fetchedEmail);
            }
        }
    }

    public function contactInfo(UnregisteredUserRequest $request){
        $validatedData = $request -> validated();
        $email = $request->email;
        $fetchedUnregisteredUser = DB::table("unregistered_users")->where("email", "=", $validatedData['email'])->first();
        if ($fetchedUnregisteredUser == null){
            $unregisteredUser = UnregisteredUser::create($validatedData);
            $unregisteredUser->save();
            $request -> session() -> put('contact_info', $unregisteredUser);
        } 
    }

    public function contactInfoUpdate(UnregisteredUserRequest $request, $user_id){
        $validatedData = $request->validated();
        $fetchedUser = UnregisteredUser::find($user_id);
        $fetchedUser->update($validatedData);
        $fetchedUser->save();
        $fetchedUser->refresh();
        $request -> session() -> put('contact_info', $fetchedUser);
    }

    public function BookingPaymentSession(BookingPaymentSessionRequest $request){
        $request->validated();
        $paymongoSecretKey = base64_encode(env('PAYMONGO_SECRET_KEY'));
        $paymongoPublicKey = base64_encode(env('PAYMONGO_PUBLIC_KEY'));
        $fetchedUser = UnregisteredUser::find($request->user_id);
        $fetchedVenue = Venue::find($request->venue_id);
        $start_date= Carbon::parse($request->start_date)->timezone('Asia/Manila')->format('Y-m-d');
        $end_date= Carbon::parse($request->end_date)->timezone('Asia/Manila')->format('Y-m-d');
    
        $transaction = Transaction::create([
            'customer_id' => $fetchedUser->id,
            'venue_id' => $fetchedVenue->id,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'transaction_amount' => $fetchedVenue->price,
            'transaction_status' => TransactionStatusEnum::PENDING,
        ]);
        try {
            $checkout = Paymongo::checkout()->create([
                'livemode' => false,
                "send_email_receipt" => true,
                'success_url' => 'http://localhost:8000/booking/payment/success',
                'cancel_url' => 'http://localhost:8000/booking/payment/cancel',
                'billing' => [
                    'name' => $fetchedUser->first_name.' '.$fetchedUser->last_name,
                    'email' => $fetchedUser->email,
                    'phone' => $fetchedUser->phone_number,
                ],
                'description' => $fetchedVenue->venue_name.' '.'reservation',
                'line_items' => [
                    [
                        'name' => $start_date.' to '.$end_date.' '.'reservation',
                        'description' => 'testttttt',
                        'amount' => $fetchedVenue->price * 100,
                        'currency' => 'PHP',
                        'quantity' => 1,
                    ],
                ],
                'payment_method_types' => [
                    'gcash',
                    'grab_pay',
                    'card',
                    'billease',
                    'paymaya',
                ],
                'reference_number' => $transaction->id,
                'statement_descriptor' => 'Laravel Paymongo Library',
            ]);
            $transaction->update([
                'paymongo_session_id' => $checkout->id,
            ]);
            $transaction->save();
            $request -> session() -> put('checkout_id', $checkout->id);
            $request->session()->put('latest_transaction', $transaction);
    
            return Inertia::location($checkout->checkout_url);
        } catch (Exception $e) {
            $transaction->delete();
            // For Development, comment out
            return redirect()->back()->withErrors([
                'api_status' => strval($e->getMessage())
                // 'api_status' => "Something went wrong"
            ]);

            // For production
            if (strpos($e->getMessage(), 'Could not resolve host: apy.paymongo.com') === false){
                return redirect()->back()->withErrors([
                    'api_status' => "Payment gateaway is offline"
                ]);
            } else{
                return redirect()->back()->withErrors([
                    'api_status' => "Something went wrong"
                ]);
            }
        }
    }


    public function venueBookingSuccess(Request $request){
        try {
            //code...
            $checkout_id = $request->session()->get('checkout_id');
            $checkout = Paymongo::checkout()->find($checkout_id);
            $transaction = Transaction::find($checkout->reference_number);
            if ($checkout->payments[0]['attributes']['status'] === 'paid'){
                $transaction = Transaction::find($checkout->reference_number);
                $transaction->update([
                    'payment_method' => $checkout->payments[0]['attributes']['source']['type'],
                    'transaction_status' => $checkout->payments[0]['attributes']['status'],
                    'payment_id' => $checkout->payments[0]['id'],
                ]);
                $transaction->save();
                $transaction->refresh();
            } 
            return to_route('booking.customerViewBooking', $transaction->id);
        } catch (\Throwable $th) {
            return abort(500);
        }
    }
    public function paymentCancel(Request $request){
        try {
            $checkout_id = $request->session()->get('checkout_id');
            $checkout = Paymongo::checkout()->find($checkout_id);
            $transaction = Transaction::find($checkout->reference_number);
            $transaction->delete();
            return to_route('booking.home');
        } catch (\Throwable $th) {
            $request->session()->forget('checkout_id');
            return to_route('booking.home');
        }
    }


    // Controller for customers to view their bookings
    public function customerViewBooking(Request $request, $reference_id){
        $fetchedTransaction = Transaction::find($reference_id);


        if ($fetchedTransaction == null){
            return abort(404);
        }

        
        $fetchedVenue = Venue::find($fetchedTransaction->venue_id);
        $fetchedRefund = DB::table('refunds')->where('transaction_id', '=', $fetchedTransaction->id)->first();
        if ($fetchedRefund != null){
            Session::forget('latest_transaction');
            return abort(404);
        } 



        $landingPhoto = $fetchedVenue->landing_photo;
        $payload = [
            'transaction' => $fetchedTransaction,
            'venue' => $fetchedVenue,
            'landing_photo' => $landingPhoto->photo_url
        ];
        return Inertia::render('Customer/ViewBooking', $payload);
    }
}
