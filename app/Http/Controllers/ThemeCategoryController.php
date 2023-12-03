<?php

namespace App\Http\Controllers;

use App\Models\ThemeCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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

    public function viewEditThemeCategory(Request $request, $category_id){
        $themeCategory = ThemeCategory::find($category_id);
        if ($themeCategory == null){
            return abort(404, "Theme Category not found");
        }
        $payload = [
            'themeCategory' => $themeCategory
        ];
        return Inertia::render('Admin/EditCategory/ThemeCategoryEditView', $payload);
    }


    public function editThemeCategory(Request $request, $category_id){
        $validatedRequest = $request->validate([
            'name' => 'required',
        ]);

        $themeCategory = ThemeCategory::find($category_id);
        if ($themeCategory == null){
            return abort(404, "Theme Category not found");
        }
        $themeCategory->name = $validatedRequest['name'];
        if($request->image != ''){        
            $path = public_path().'/storage/'.$themeCategory->image;
  
            //code for remove old file
            if($themeCategory->image != ''  && $themeCategory->image != null && file_exists($path)){
                 $file_old = public_path().'/storage/'.$themeCategory->image;
                 unlink($file_old);
            }
  
            if (! Storage::putFile('public/theme_covers/'.$themeCategory->id, $request['image'])) {
                return abort(500, "Failed to upload header image");
            }
            $themeCategory->image =  'theme_covers/'.$themeCategory->id.'/'.$request['image']->hashName();
        }
        $themeCategory->save();
        return back()->with('success', 'Theme Category Updated');
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
