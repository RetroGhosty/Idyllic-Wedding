<?php

namespace App\Http\Controllers;

use App\Models\PlaceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceCategoryController extends Controller
{
    public function createPlaceCategory(Request $request){
   
        $validatedRequest = $request->validate([
            'name' => 'required',
        ]);
        $placeCategory = PlaceCategory::create($validatedRequest);
        return back()->with('success', 'Place Category Created');
    }

    public function viewEditPlaceCategory(Request $request, $category_id){
        $placeCategory = PlaceCategory::find($category_id);
        if ($placeCategory == null){
            return abort(404, "Place Category not found");
        }
        $payload = [
            'placeCategory' => $placeCategory
        ];
        return Inertia::render('Admin/EditCategory/PlaceCategoryEditView', $payload);
    }



    public function editPlaceCategory(Request $request, $category_id){
        $validatedRequest = $request->validate([
            'name' => 'required',
        ]);
        $placeCategory = PlaceCategory::find($category_id);
        if ($placeCategory == null){
            return abort(404, "Place Category not found");
        }
        $placeCategory->name = $validatedRequest['name'];
        $placeCategory->save();
        return back()->with('success', 'Place Category Updated');
    }

    public function deletePlaceCategory(Request $request){
        $validatedRequest = $request->validate([
            'category_id' => 'required',
        ]);
        $placeCategory = PlaceCategory::find($validatedRequest['category_id']);
        if ($placeCategory == null){
            return abort(404, "Place Category not found");
        }
        $placeCategory->delete();
        return back()->with('success', 'Place Category Deleted');
    }
}
