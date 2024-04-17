<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'sales_data',
        'total_price',
        'customer_id',
        'user',
    ];

    
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'user_id');
    }

    public function details()
    {
        return $this->hasMany(Detail::class, 'sale_id');
    }
    
}
