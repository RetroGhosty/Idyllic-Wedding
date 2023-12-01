<?php

namespace App\Http\Controllers;

use App\Models\ThemeCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ThemeCategoryController extends Controller
{
    //
    public function createThemeCategory(Request $request){
        $validatedRequest = $request->validate([
            'name' => ['required'],
            'image' => ['required', 'image']
        ]);
        $themeCategory = ThemeCategory::create($validatedRequest);
        if (! Storage::putFile('public/theme_covers/'.$themeCategory->id, $validatedRequest['image'])) {
            return abort(500, "Failed to upload header image");
        }
        $themeCategory->image =  'theme_covers/'.$themeCategory->id.'/'.$validatedRequest['image']->hashName();
        $themeCategory->save();
        return back()->with('success', 'Theme Category Created');
    }

    public function deleteThemeCategory(Request $request){
        $validatedRequest = $request->validate([
            'category_id' => 'required',
        ]);
        $themeCategory = ThemeCategory::find($validatedRequest['category_id']);
        $localFilePath = public_path().'/storage/'.$themeCategory->image;
        if (file_exists($localFilePath)){
            unlink($localFilePath);
        }
        if ($themeCategory == null){
            return abort(404, "Theme Category not found");
        }
        $themeCategory->delete();
        return back()->with('success', 'Theme Category Deleted');
    }
}
