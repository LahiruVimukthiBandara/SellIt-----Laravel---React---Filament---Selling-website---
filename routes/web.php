<?php

use App\Http\Controllers\AdsController;
use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\ProfileController;
use App\Models\Advertisement;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/createAd', function () {
    return Inertia::render('CreateAd');
})->middleware(['auth', 'verified'])->name('createAd');
Route::get('/Welcome', function () {
    return Inertia::render('Welcome');
})->middleware(['auth', 'verified'])->name('Welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/ads', AdvertisementController::class);
    Route::get('/myAds', [AdvertisementController::class, 'myAds']);
});

Route::get('/featured', [AdvertisementController::class, 'featuredAds']);

Route::get('/adds', function () {
    return Inertia::render('Add/Adds');
})->name('add');
Route::get('/about', function () {
    return Inertia::render('About/About');
})->name('add');
Route::get('/createAd', function () {
    return Inertia::render('Add/CreateAd');
})->name('add');

Route::get('/customerAds', [AdsController::class, 'index']);

require __DIR__.'/auth.php';
