<?php
namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\EmailCheckerRequest;
use App\Http\Requests\UnregisteredUserRequest;
use App\Models\Transaction;
use App\Models\UnregisteredUser;
use App\Models\Venue;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Redirect;
use Luigel\Paymongo\Facades\Paymongo;

class BookingController extends Controller
{
    public function view(Request $request){
        $venues = Venue::all('id', 'venue_name', 'limit', 'price');
        $transactions = DB::table('transactions')->where('transaction_status', '!=', TransactionStatusEnum::CANCELLED)->get();
        $payload = [
            'venues' => $venues,
            'session' => $request->session()->get('contact_info'),
            'transactions' => $transactions,
        ];
        return Inertia::render('Guest/Booking', $payload);
    }

    public function emailCheck(EmailCheckerRequest $request) {
        $validatedData = $request -> validated();
        
        $fetchedEmail = DB::table("unregistered_users")->where("email", "=", $request->email)->first();
        $fetchedUnregisteredUser = UnregisteredUser::find($fetchedEmail->id);
        $fetchedTransaction = $fetchedUnregisteredUser->transaction;
        if ($fetchedTransaction->count()  > 0 ){
            dd($fetchedUnregisteredUser->transaction[0]);
        } else{
            dd("no transaction");
        }

        if($fetchedEmail == null){
            $request->session()->put('contact_info', $validatedData);
        } else {
            $request->session()->put('contact_info', $fetchedEmail);
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


    public function BookingPaymentSession(Request $request){
        $paymongoSecretKey = base64_encode(env('PAYMONGO_SECRET_KEY'));
        $paymongoPublicKey = base64_encode(env('PAYMONGO_PUBLIC_KEY'));
        $fetchedUser = UnregisteredUser::find($request->user_id);
        
        $fetchedVenue = Venue::find($request->venue_id);
        $dateSelected= Carbon::parse($request->dateSelected)->format('Y-m-d');
        try {
            $transaction = Transaction::create([
                'customer_id' => $fetchedUser->id,
                'venue_id' => $fetchedVenue->id,
                'event_date' => $dateSelected,
                'transaction_amount' => $fetchedVenue->price,
                'transaction_status' => TransactionStatusEnum::PENDING,
            ]);
            $checkout = Paymongo::checkout()->create([
                'livemode' => true,
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
                        'name' => $dateSelected,
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
            $request -> session() -> put('checkout_id', $checkout->id);
            return Inertia::location($checkout->checkout_url);
        } catch (Exception $e) {

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

    // TODO:
    // 1. Check if payment is already existing

    public function venueBookingSuccess(Request $request){
        $checkout_id = $request->session()->get('checkout_id');
        $checkout = Paymongo::checkout()->find($checkout_id);
        $transaction = Transaction::find($checkout->reference_number);
        if ($checkout->payments[0]['attributes']['status'] === 'paid'){
            $transaction = Transaction::find($checkout->reference_number);
            $transaction->update([
                'payment_method' => $checkout->payments[0]['attributes']['source']['type'],
                'transaction_status' => $checkout->payments[0]['attributes']['status'],
            ]);
            $transaction->save();
            $transaction->refresh();
        } 
        return to_route('booking.home');
    }
    public function paymentCancel(Request $request){
        $checkout_id = $request->session()->get('checkout_id');
        $checkout = Paymongo::checkout()->find($checkout_id);
        $transaction = Transaction::find($checkout->reference_number);
        $transaction->delete();
        return to_route('booking.home');
    }

}
