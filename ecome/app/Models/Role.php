<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description'
    ];


// app/Models/User.php
public function role()
{
    return $this->belongsTo(Role::class);
}

public function isAdmin()
{
    return $this->role && $this->role->name === 'admin';
}
}