<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\choices\UserAccountLevel;

class UserRolePagePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roleLevel): Response
    {
        if (Auth::check() && Auth::user()->user_level == UserAccountLevel::from($roleLevel) || Auth::check() && Auth::user()->user_level == UserAccountLevel::SUPERADMIN) {
            return $next($request);
        } else{
            return to_route('profile.edit');
        }
    }
}
