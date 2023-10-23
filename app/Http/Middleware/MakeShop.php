<?php

namespace App\Http\Middleware;

use App\Models\Shop;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class MakeShop
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user->user_level == 1){
            $shop = Shop::where("vendor_id", $user->id)->first();
            if (!$shop){
                Shop::create([
                    "shop_name" => $user->name." shop",
                    "vendor_id" => $user->id
                ]);
            }
            return $next($request);
        } else{
            $shop = Shop::where("vendor_id", $user->id)->first();
            $shop->delete(); 
            abort(404);
        }
    }
}
