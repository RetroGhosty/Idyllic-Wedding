<?php

namespace App\Http\Middleware;

use App\Models\UnregisteredUser;
use Closure;
use Illuminate\Http\Request;
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
            $fetchedTransaction = $fetchedUnregisteredUser->transaction;
            if ($fetchedTransaction->count()  > 0 ){
                if ($fetchedTransaction[0]->transaction_status == "pending"){
                    $checkoutLink = Paymongo::checkout()->find($fetchedTransaction[0]->paymongo_session_id);
                    return Inertia::location($checkoutLink->checkout_url);
                }
            } else{
                return $next($request);
            }
        }
        return $next($request);
    }
}
