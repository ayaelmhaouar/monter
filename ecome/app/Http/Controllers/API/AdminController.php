<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function statistics()
    {
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalUsers = User::count();
        $revenue = Order::where('payment_status', 'paid')->sum('total_amount');

        return response()->json([
            'total_products' => $totalProducts,
            'total_orders' => $totalOrders,
            'total_users' => $totalUsers,
            'revenue' => $revenue,
        ]);
    }

    public function orders()
    {
        $orders = Order::with('user', 'orderItems.product')->get();

        return response()->json($orders);
    }

    public function users()
    {
        $users = User::all();

        return response()->json($users);
    }
}