<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // ADMIN & STAFF
    // Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Stock Movement Routes
    Route::get('/stock', [StockMovementController::class, 'index'])->name('stock.index');
    Route::post('/stock', [StockMovementController::class, 'store'])->name('stock.store');


    // ADMIN
    Route::middleware('role:1')->group(function () {
        // Product Routes
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');

        // Product CRUD Routes
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        // User Management Routes
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });
});

require __DIR__ . '/settings.php';
