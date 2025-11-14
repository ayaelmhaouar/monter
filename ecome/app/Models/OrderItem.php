<?php
// app/Models/OrderItem.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'watch_id',
        'watch_name',
        'unit_price',
        'quantity',
        'total_price',
        'watch_snapshot'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'watch_snapshot' => 'array',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function watch()
    {
        return $this->belongsTo(Watch::class);
    }
}