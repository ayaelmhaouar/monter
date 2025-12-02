public function payment()
{
    return $this->hasOne(Payment::class);
}

public function payments()
{
    return $this->hasMany(Payment::class);
}