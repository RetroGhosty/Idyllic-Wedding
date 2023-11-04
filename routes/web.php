<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageNotFoundController;
use App\Http\Controllers\PhotographerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\VenueShowcasePhotoController;
use App\Http\Controllers\VenueVendorController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\AdminReservationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HighlightController;
use App\Http\Controllers\OurVenueController;
use App\Http\Controllers\PublicVenueController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueLandingPhotoController;
use App\Models\Reservation;
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
})->name('landing-page');

// Guest Pages
Route::get("/about", [AboutController::class, 'about'])->name('about.home');
Route::get("/highlights", [HighlightController::class, 'view'])->name('highlights.home');
Route::get("/venues", [PublicVenueController::class, 'view'])->name('venues.home');
Route::get("/venues/{venue_name}", [PublicVenueController::class, 'view_single'])->name('venues.view_single');
Route::get("/contacts", [ContactController::class, 'view'])->name('contacts.home');

Route::get("/booking", [BookingController::class, 'view'])->name('booking.home');

// Admin Protected Pages
Route::middleware(['auth', 'verified'])->group(function(){
    Route::get("/dashboard", [AdminReservationController::class, 'viewReservation'])->name('dashboard');
});
Route::middleware(['auth', 'check-disabled'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware(['auth', 'check-disabled', 'user-level:admin'])->group(function(){
    Route::get('/admin', [AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/profile/user/{user_id}', [AdminController::class,'viewUser'])->name('admin.user.view');
    Route::patch('/admin/profile/user/{user_id}', [AdminController::class,'update'])->name('admin.user.update');
    Route::delete('/admin/profile/user/{user_id}', [AdminController::class,'delete'])->name('admin.user.delete');
    Route::get('/admin/venue', [VenueController::class,'createView'])->name('admin.venue.createView');
    Route::post('/admin/venue', [VenueController::class,'post'])->name('admin.venue.create');
    Route::get('/admin/venue/{venue_id}', [VenueController::class,'editView'])->name('admin.venue.view');
    Route::patch('/admin/venue/{venue_id}', [VenueController::class,'edit'])->name('admin.venue.update');
    Route::delete('/admin/venue/{venue_id}', [VenueController::class,'delete'])->name('admin.venue.delete');
    Route::get('/admin/photographer', [PhotographerController::class,'createView'])->name('admin.photographer.createView');
    Route::post('/admin/photographer', [PhotographerController::class,'createPhotographer'])->name('admin.photographer.createPhotographer');
    Route::get('/admin/photographer/{photographer_id}', [PhotographerController::class,'view'])->name('admin.photographer.view');
    Route::post('/admin/photographer/{photographer_id}', [PhotographerController::class,'update'])->name('admin.photographer.update');
    Route::delete('/admin/photographer/{photographer_id}', [PhotographerController::class,'delete'])->name('admin.photographer.delete');
    Route::delete('/admin/landingphoto', [VenueLandingPhotoController::class,'delete'])->name('admin.landingphoto.delete');
    Route::delete('/admin/showcasephoto', [VenueShowcasePhotoController::class,'delete'])->name('admin.showcasephoto.delete');
    Route::patch('/admin/reservation/edit/{reservation_id}', [ReservationController::class,'editStatus'])->name('admin.reservation.editStatus');
});    

Route::get('/notfound', [PageNotFoundController::class,'index'])->name('notfound');

require __DIR__.'/auth.php';
