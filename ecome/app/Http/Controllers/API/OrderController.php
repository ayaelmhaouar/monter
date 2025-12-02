<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        // Retourne les commandes de l'utilisateur connecté
        return $request->user()->orders()->with('orderItems.product')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($request) {
            $order = new Order();
            $order->user_id = $request->user()->id;
            $order->status = 'pending';
            $order->total_amount = 0;
            $order->payment_status = 'pending';
            $order->save();

            $total = 0;

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                $price = $product->price;
                $quantity = $item['quantity'];
                $subtotal = $price * $quantity;

                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $product->id;
                $orderItem->quantity = $quantity;
                $orderItem->price = $price;
                $orderItem->save();

                $total += $subtotal;
            }

            $order->total_amount = $total;
            $order->save();

            return response()->json($order, 201);
        });
    }

    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()->with('orderItems.product')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return $order;
    }

    // ... autres méthodes (update, destroy) si nécessaire
}