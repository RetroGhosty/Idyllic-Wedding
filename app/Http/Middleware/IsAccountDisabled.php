<?php

namespace App\Http\Middleware;

use App\choices\UserAccountStatusEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAccountDisabled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user()->status == UserAccountStatusEnum::DISABLED){
            if (auth()->logout()){
                return abort(403, 'Your account has been disabled.');
            } else{
                return abort(500,'Something went wrong.');
            }
        } else {
            return $next($request);
        }
    }
}
