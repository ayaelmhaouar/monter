<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\AdminController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/category/{category}', [ProductController::class, 'byCategory']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/products/search/{keyword}', [ProductController::class, 'search']);
Route::get('/health', function () {
    return response()->json(['status' => 'OK', 'timestamp' => now()]);
});



Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
    
    // Contacts (protected - only for logged-in users)
    Route::get('/contacts', [ContactController::class, 'index']);
    
    // Payments
    Route::prefix('payments')->group(function () {
        Route::get('/', [PaymentController::class, 'index']);
        Route::get('/{id}', [PaymentController::class, 'show']);
        Route::post('/orders/{orderId}/initiate', [PaymentController::class, 'initiate']);
        Route::post('/{paymentId}/process', [PaymentController::class, 'process']);
    });
});

// =============================================
// ADMIN ROUTES - Admin role required
// =============================================
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Payments admin
    Route::post('/payments/{paymentId}/confirm', [PaymentController::class, 'confirm']);
    
    // Product management (full CRUD for admin)
    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });
    
    // Order management (admin)
    Route::prefix('orders')->group(function () {
        Route::get('/all', [OrderController::class, 'adminIndex']);
        Route::put('/{id}/status', [OrderController::class, 'updateStatus']);
    });
    
    // User management (admin)
    Route::prefix('users')->group(function () {
        Route::get('/', [AdminController::class, 'users']);
        Route::put('/{id}/role', [AdminController::class, 'updateRole']);
        Route::delete('/{id}', [AdminController::class, 'destroyUser']);
    });
    
    // Statistics (admin) - FIXED: Removed duplicate 'admin' prefix
    Route::get('/stats', [AdminController::class, 'stats']);
});