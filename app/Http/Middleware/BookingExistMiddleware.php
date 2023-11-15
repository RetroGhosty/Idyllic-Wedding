<?php

namespace App\Http\Middleware;

use App\Models\UnregisteredUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;
use Symfony\Component\HttpFoundation\Response;

class BookingExistMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (session()->has('contact_info')) {
            $fetchedUnregisteredUser = UnregisteredUser::find(session()->get('contact_info')->id);
            if ($fetchedUnregisteredUser == null){
                session()->forget('contact_info');
                return to_route('booking.home');
            }
            $fetchedTransaction = DB::table('transactions')->where('customer_id', '=', $fetchedUnregisteredUser->id)->where('event_date', '>=', date('Y-m-d'))->latest('updated_at')->first();
            if ($fetchedTransaction != null ){
                if ($fetchedTransaction->transaction_status == "paid"){
                    
                    return to_route('booking.customerViewBooking', $fetchedTransaction->id);
                }
                if ($fetchedTransaction->transaction_status == "pending"){
                    $checkoutLink = Paymongo::checkout()->find($fetchedTransaction->paymongo_session_id);
                    return Inertia::location($checkoutLink->checkout_url);
                }
            } else{
                return $next($request);
            }
        }
        return $next($request);
    }
}
