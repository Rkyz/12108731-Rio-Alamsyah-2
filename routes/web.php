<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellingController;
use App\Http\Controllers\AuthenticatedSessionController;
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


    // Fitur Login
    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('login', [AuthenticatedSessionController::class, 'store']);
    });

    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::get('/history', function () {
            return Inertia::render('History/Main');
        });

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
        Route::get('/user', [UserController::class, 'index'])->middleware('admin');
        Route::post('/user', [UserController::class, 'store'])->middleware('admin');
        Route::put('/user/{id}', [UserController::class, 'edit'])->middleware('admin');
        Route::delete('/user/{id}', [UserController::class, 'destroy'])->middleware('admin');

        
        Route::get('/product', [ProductController::class, 'index']);
        Route::post('/product', [ProductController::class, 'store']);
        Route::put('/product/stok/{id}', [ProductController::class, 'updateStok']);
        Route::delete('/product/{id}', [ProductController::class, 'destroy']);

        Route::get('/menus/{category}', [ProductController::class, 'show']);
        
        Route::get('/menus', [CategoryController::class, 'index']);
        Route::post('/menus', [CategoryController::class, 'store']);
        Route::put('/menus/{id}', [CategoryController::class, 'edit']);
        Route::delete('/menus/{id}', [CategoryController::class, 'destroy']);

        Route::post('/buying', [SellingController::class, 'createSale']);
        Route::get('/history', [SellingController::class, 'index']);

        Route::get('/invoice/{sale}', [SellingController::class, 'show'])->name('invoice.show');

    });


