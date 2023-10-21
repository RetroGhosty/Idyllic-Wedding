<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopVendorController extends Controller
{
    public function index(){
        try {
            //code...
            if (auth()->user()->user_level >= 1){
                return Inertia::render("ShopVendor/Dashboard");
            } else{
                return Inertia::render("NotFound");
            }
        } catch (\Throwable $th) {
            //throw $th;
            return abort(500, "Something went wrong");
        }
    }
}
