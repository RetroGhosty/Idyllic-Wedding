<?php

namespace App\Http\Controllers;

use App\Models\ThemeCategory;
use Illuminate\Http\Request;

class ThemeCategoryController extends Controller
{
    //
    public function createThemeCategory(Request $request){
        $validatedRequest = $request->validate([
            'name' => 'required',
        ]);
        $themeCategory = ThemeCategory::create($validatedRequest);
        return back()->with('success', 'Theme Category Created');
    }

    public function deleteThemeCategory(Request $request){
        $validatedRequest = $request->validate([
            'category_id' => 'required',
        ]);
        $themeCategory = ThemeCategory::find($validatedRequest['category_id']);
        if ($themeCategory == null){
            return abort(404, "Theme Category not found");
        }
        $themeCategory->delete();
        return back()->with('success', 'Theme Category Deleted');
    }
}
