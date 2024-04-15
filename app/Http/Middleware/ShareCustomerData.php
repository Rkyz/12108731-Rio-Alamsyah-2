<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Customer;
use Illuminate\Support\Facades\View;

class ShareCustomerData
{
    // public function handle($request, Closure $next)
    // {
    //     $customers = Customer::all();
    //     View::share('customers', $customers);

    //     return $next($request);
    // }
}
