<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\DashboardController;
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
    });
});

require __DIR__ . '/settings.php';
