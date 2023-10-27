<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageNotFoundController;
use App\Http\Controllers\PhotographerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VenueVendorController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\OurVenueController;
use App\Http\Controllers\VenueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// localhost:8000/About
Route::get("/About", [AboutController::class, 'about'])->name('about.home');

Route::get("/OurVenue", [OurVenueController::class, 'Venue'])->name('OurVenue.home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'check-disabled'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Vendor Protected
Route::middleware(['auth', 'check-disabled', 'shop-creator', 'user-level:vendor'])->group(function() {
    Route::get('/shop', [VenueVendorController::class,'index'])->name('shopvendor.dashboard');
    Route::patch('/shop', [VenueVendorController::class,'updateStore'])->name('shopvendor.updatestore');
    Route::post('/shop/product/create', [VenueVendorController::class,'createProduct'])->name('shopvendor.createproduct');
});

// Admin Protected Pages
Route::middleware(['auth', 'check-disabled', 'user-level:admin'])->group(function(){
    Route::get('/admin', [AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/profile/user/{user_id}', [AdminController::class,'viewUser'])->name('admin.user.view');
    Route::patch('/admin/profile/user/{user_id}', [AdminController::class,'update'])->name('admin.user.update');
    Route::delete('/admin/profile/user/{user_id}', [AdminController::class,'delete'])->name('admin.user.delete');
    Route::get('/admin/venue/{venue_id}', [VenueController::class,'view'])->name('admin.venue.view');
    Route::patch('/admin/venue/{venue_id}', [VenueController::class,'edit'])->name('admin.venue.update');
    Route::delete('/admin/venue/{venue_id}', [VenueController::class,'delete'])->name('admin.venue.delete');
    Route::get('/admin/photographer/{photographer_id}', [PhotographerController::class,'view'])->name('admin.photographer.view');
    Route::patch('/admin/photographer/{photographer_id}', [PhotographerController::class,'update'])->name('admin.photographer.update');
    Route::delete('/admin/photographer/{photographer_id}', [PhotographerController::class,'delete'])->name('admin.photographer.delete');

});    

Route::get('/notfound', [PageNotFoundController::class,'index'])->name('notfound');

require __DIR__.'/auth.php';
