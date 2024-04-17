<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'no_hp'
    ];
    
    public function sales()
    {
        return $this->hasMany(Sale::class, 'customer_id');
    }
    
}
