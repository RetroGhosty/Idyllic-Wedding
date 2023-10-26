<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageNotFoundController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VenueVendorController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\OurvenueController;
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

Route::get("/OurVenue", [OurvenueController::class, 'venue'])->name('OurVenue.home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Vendor Protected
Route::middleware(['auth', 'shop-creator', 'user-level:1'])->group(function() {
    Route::get('/shop', [VenueVendorController::class,'index'])->name('shopvendor.dashboard');
    Route::patch('/shop', [VenueVendorController::class,'updateStore'])->name('shopvendor.updatestore');
    Route::post('/shop/product/create', [VenueVendorController::class,'createProduct'])->name('shopvendor.createproduct');
});

// Admin Protected Pages
Route::middleware(['auth', 'user-level:2'])->group(function(){
    Route::get('/admin', [AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/profile/user/{user_id}', [AdminController::class,'viewUser'])->name('admin.user.view');
    Route::patch('/admin/profile/user/{user_id}', [AdminController::class,'update'])->name('admin.user.update');
});    

Route::get('/notfound', [PageNotFoundController::class,'index'])->name('notfound');

require __DIR__.'/auth.php';
