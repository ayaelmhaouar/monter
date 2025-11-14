<?php
// app/Models/Watch.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Watch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'compare_price',
        'sku',
        'brand',
        'model',
        'gender',
        'movement',
        'case_material',
        'strap_material',
        'case_diameter',
        'water_resistance',
        'crystal',
        'features',
        'stock_quantity',
        'is_featured',
        'is_active',
        'image',
        'gallery',
        'category_id'
    ];

    protected $casts = [
        'features' => 'array',
        'gallery' => 'array',
        'price' => 'decimal:2',
        'compare_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->reviews()->where('is_approved', true)->avg('rating');
    }

    public function getReviewCountAttribute()
    {
        return $this->reviews()->where('is_approved', true)->count();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }
}