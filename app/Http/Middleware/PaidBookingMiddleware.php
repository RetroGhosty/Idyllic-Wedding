<?php

namespace App\Http\Middleware;

use App\Models\UnregisteredUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PaidBookingMiddleware
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
            $fetchedTransaction = DB::table('transactions')->where('customer_id', '=', $fetchedUnregisteredUser->id)->where('event_date', '>=', date('Y-m-d'))->latest('updated_at')->first();
            if ($fetchedTransaction == null){
                session()->forget('contact_info');
                return to_route('booking.home');
            } 
            if ($fetchedUnregisteredUser == null){
                session()->forget('contact_info');
                return to_route('booking.home');
            } else{
                return $next($request);
            }
        } else{
            return to_route('booking.home');
        }
    }
}
