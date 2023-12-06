<?php

namespace App\Http\Middleware;

use App\choices\UserAccountLevel;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authUser = auth()->user();
        $fetchedUserRole = User::find($authUser->id)->user_level;
        if ($fetchedUserRole != UserAccountLevel::SUPERADMIN){
            return redirect()->route('admin.dashboard');
        }
        return $next($request);
    }
}
