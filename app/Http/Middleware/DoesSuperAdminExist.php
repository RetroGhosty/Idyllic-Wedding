<?php

namespace App\Http\Middleware;

use App\choices\UserAccountLevel;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DoesSuperAdminExist
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (User::where('user_level', UserAccountLevel::SUPERADMIN)->count() == 0){

            return redirect()->route('superadmin.create.view');
        }
        return $next($request);
    }
}
