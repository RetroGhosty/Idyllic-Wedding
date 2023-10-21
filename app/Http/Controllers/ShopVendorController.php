<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Shop;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShopVendorController extends Controller
{
    public function index(){
        //code...
        if (auth()->user()->user_level == 1){
            $shop = Shop::where('vendor_id', auth()->user()->id)->get()->first();
            return Inertia::render("ShopVendor/Dashboard", ["shop"=> $shop]);
        } else{
            return abort(404, "Page not found");
        }
    }
    public function createProduct(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'numeric|min:0',
            'description' => 'required',
        ]);

        $shop = Shop::find($request->shop_id);

        $shop->product()->create([
            "name"=> $request->name,
            "price"=> $request->price,
            "description"=> $request->description,
            "image" => $request->file("image")->getClientOriginalName(),
        ]);
        
        if ($request->hasFile("image")) {
            $destinationPath = $shop->shop_name.'/products';
            $image = $request->file('image');
            $image_name = $image->getClientOriginalName();
            $path = $image->storeAs($destinationPath, $image_name);
        };


        return back();
    }
}
