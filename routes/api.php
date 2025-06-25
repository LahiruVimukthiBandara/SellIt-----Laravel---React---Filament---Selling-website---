<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\MainCategoryController;
use App\Http\Controllers\ProvinceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/categories', MainCategoryController::class);
Route::resource('/province', ProvinceController::class);
