<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Customer;

class ShareCustomerData
{
    public function handle($request, Closure $next)
    {
        if (class_exists(Customer::class)) {
            $customers = Customer::all();
            view()->share('customers', $customers);
        }

        return $next($request);
    }
}
