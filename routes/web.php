<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageNotFoundController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\UnregisteredUserController;
use App\Http\Controllers\VenueShowcasePhotoController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\AdminTransactionController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmailInquiryController;
use App\Http\Controllers\HighlightController;
use App\Http\Controllers\PlaceCategoryController;
use App\Http\Controllers\PublicVenueController;
use App\Http\Controllers\ThemeCategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueLandingPhotoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

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
    $venues = DB::table('venues')
    ->join('venue_landing_photos', function(JoinClause $join){
        $join->on('venues.id', '=', 'venue_landing_photos.venue_id');
    })
    ->get();
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'venues' => $venues
    ]);
})->name('landing-page');

// Guest Pages
Route::get("/about", [AboutController::class, 'about'])->name('about.home');
Route::get("/highlights", [HighlightController::class, 'view'])->name('highlights.home');
Route::get("/venues", [PublicVenueController::class, 'view'])->name('venues.home');
Route::get("/venues/{venue_name}", [PublicVenueController::class, 'view_single'])->name('venues.view_single');
Route::get("/contacts", [ContactController::class, 'view'])->name('contacts.home');

Route::post("/booking/email", [BookingController::class, 'emailCheck'])->name('booking.emailCheck');
Route::post("/booking/contact", [BookingController::class, 'contactInfo'])->name('booking.contactinfo');
Route::get("/booking/payment/success", [BookingController::class, "venueBookingSuccess"])->name('booking.venueBookingSuccess');
Route::get("/booking/payment/cancel", [BookingController::class, "paymentCancel"])->name('booking.paymentCancel');
Route::get("/booking", [BookingController::class, 'view'])->name('booking.home');

Route::post('/contact', [EmailInquiryController::class, 'makeInquiry'])->name('contacts.makeInquiry');



Route::get("/booking/view/{reference_id}", [BookingController::class, "customerViewBooking"])->name('booking.customerViewBooking');
Route::patch("/booking/contact/{user_id}", [BookingController::class, 'contactInfoUpdate'])->name('booking.contactInfoUpdate');
Route::post("/booking/payment", [BookingController::class, "BookingPaymentSession"])->name('booking.BookingPaymentSession');


Route::middleware(['auth', 'check-disabled'])->group(function () {
    Route::get('/setup', [SuperAdminController::class, 'makeSuperAdminView'])->name('superadmin.create.view');
    Route::post('/setup', [SuperAdminController::class, 'makeSuperAdmin'])->name('superadmin.create');
    Route::get('/profile', [ProfileController::class, 'edit'])
    ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin pages and such
Route::middleware(['auth', 'check-disabled', 'does-superadmin-exist', 'user-level:admin'])->group(function(){
    Route::get('/admin', [AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/profile/user/{user_id}', [AdminController::class,'viewUser'])->name('admin.user.view');
    Route::patch('/admin/profile/user/{user_id}', [AdminController::class,'update'])->name('admin.user.update');
    Route::delete('/admin/profile/user/{user_id}', [AdminController::class,'delete'])->name('admin.user.delete');
    Route::get('/admin/venue', [VenueController::class,'createView'])->name('admin.venue.createView');
    Route::post('/admin/venue', [VenueController::class,'post'])->name('admin.venue.create');
    Route::get('/admin/venue/{venue_id}', [VenueController::class,'editView'])->name('admin.venue.view');
    Route::patch('/admin/venue/{venue_id}', [VenueController::class,'edit'])->name('admin.venue.update');
    Route::delete('/admin/venue/{venue_id}', [VenueController::class,'delete'])->name('admin.venue.delete');
    Route::delete('/admin/landingphoto', [VenueLandingPhotoController::class,'delete'])->name('admin.landingphoto.delete');
    Route::delete('/admin/showcasephoto', [VenueShowcasePhotoController::class,'delete'])->name('admin.showcasephoto.delete');
    Route::patch('/admin/reservation/edit/{transaction_id}', [TransactionController::class,'editStatus'])->name('admin.reservation.editStatus');
    Route::get("/dashboard", [AdminTransactionController::class, 'viewReservation'])->name('dashboard');
    Route::post("/dashboard/refund/{transaction_id}", [AdminTransactionController::class, 'requestRefund'])->name('admin.transaction.requestRefund');
    Route::get("/refund/{transaction_id}", [AdminTransactionController::class, 'viewRefundInfo'])->name('dashboard.transaction.viewRefundInfo');
    Route::delete("/admin/customer/delete", [UnregisteredUserController::class, 'deleteBatch'])->name('admin.customer.deleteBatch');
    Route::get("/admin/inbox", [EmailInquiryController::class, 'viewInquiries'])->name('inbox.view');

    Route::get("/admin/customer/{customer_id}", [UnregisteredUserController::class, 'viewCustomer'])->name('admin.customer.viewCustomer');
    Route::patch("/admin/customer/{customer_id}", [UnregisteredUserController::class, 'editCustomer'])->name('admin.customer.editCustomer');

    Route::get("/admin/transaction/{transaction_id}", [TransactionController::class, 'viewTransaction'])->name('admin.transaction.viewTransaction');

    Route::patch("/admin/transaction/{transaction_id}", [TransactionController::class, 'editVenueTransactionDetails'])->name('admin.transaction.editVenueTransactionDetails');
});    

// For theme and place category
Route::middleware(['auth', 'check-disabled', 'does-superadmin-exist', 'user-level:admin'])->group(function(){
    // Create

    Route::post('/place-category/create', [PlaceCategoryController::class,'createPlaceCategory'])->name('admin.placeCategory.createPlaceCategory');
    Route::post('/theme-category/create', [ThemeCategoryController::class,'createThemeCategory'])->name('admin.placeCategory.createThemeCategory');
    
    // Update view
    Route::get('/place-category/{category_id}', [PlaceCategoryController::class,'viewEditPlaceCategory'])->name('admin.editPlaceCategory.view');
    Route::get('/theme-category/{category_id}', [ThemeCategoryController::class,'viewEditThemeCategory'])->name('admin.viewEditThemeCategory.view');



    // Update
    Route::post('/theme-category/edit/{category_id}', [PlaceCategoryController::class,'editPlaceCategory'])->name('admin.placeCategory.editPlaceCategory');
    Route::post('/theme-category/edit/{category_id}', [ThemeCategoryController::class,'editThemeCategory'])->name('admin.themeCategory.editThemeCategory');


    // Delete
    Route::delete('/place-category/delete', [PlaceCategoryController::class,'deletePlaceCategory'])->name('admin.placeCategory.deletePlaceCategory');
    Route::delete('/theme-category/delete', [ThemeCategoryController::class,'deleteThemeCategory'])->name('admin.themeCategory.deleteThemeCategory');


});

// Super admin pages
Route::middleware(['auth', 'check-disabled', 'does-superadmin-exist', 'superadmin-check'])->group(function(){
    Route::get('/superadmin/users', [SuperAdminController::class, 'viewSuperAdminPanel'])->name('superadmin.view');
    Route::get('/superadmin/user/{user_id}', [SuperAdminController::class, 'editUserView'])->name('superadmin.edit.view');
    Route::patch('/superadmin/user', [SuperAdminController::class, 'editUser'])->name('superadmin.edit');
    Route::delete('/superadmin/user', [SuperAdminController::class, 'deleteBatch'])->name('superadmin.deleteBatch');
});

Route::get('/notfound', [PageNotFoundController::class,'index'])->name('notfound');

require __DIR__.'/auth.php';
