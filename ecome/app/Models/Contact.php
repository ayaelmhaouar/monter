<?php
// app/Models/Contact.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'admin_notes',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function markAsInProgress()
    {
        $this->update(['status' => 'in_progress']);
    }

    public function markAsResolved()
    {
        $this->update(['status' => 'resolved']);
    }
}
