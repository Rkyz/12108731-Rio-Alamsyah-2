<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\category;
use App\Models\customer;
use App\Models\Detail;
use App\Models\product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Sales = Sale::with('customer', 'details.product')->get();
        
        $mergedSales = [];
    
        foreach ($Sales as $Sale) {
            $customerId = $Sale->customer->id;
    
            if (!isset($mergedSales[$customerId])) {
                $mergedSales[$customerId] = $Sale;
            } else {
                $mergedDetails = array_merge($mergedSales[$customerId]->details->toArray(), $Sale->details->toArray());
                $mergedSales[$customerId]->details = collect($mergedDetails);
            }
        }
    
        return Inertia::render('History/Main', [
            'Sale' => $mergedSales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $Sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $Sale)
    {
        //
    }

    public function createSale(Request $request)
    {
        $request->validate([
            'sales_date' => 'required|date',
            'customer.name' => 'required|string',
            'customer.address' => 'required|string', 
            'customer.no_hp' => 'required|string',
            'details' => 'required|array',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.amount' => 'required|integer|min:1', 
        ]);
        
    
        $errors = [];
        foreach ($request->input('details') as $detail) {
            $product = Product::findOrFail($detail['product_id']);
            if ($detail['amount'] > $product->stock) {
                $errors[] = "stock produk {$product->name} tidak mencukupi";
            }
        }
    
        if (!empty($errors)) {
             return redirect()->back()->with('message', $errors);
        }
    
        // $customer = Customer::where('no_hp', $request->input('pelanggan.no_hp'))->first();
        $customer = Customer::where('name', $request->input('customer.name'))
        ->where('address', $request->input('customer.address'))
        ->where('no_hp', $request->input('customer.no_hp'))
        ->first();
        
        if (!$customer) {
            $customer = new Customer();
            $customer->name = $request->input('customer.name');
            $customer->address = $request->input('customer.address');
            $customer->no_hp = $request->input('customer.no_hp');
            $customer->save();
        }
    
        $Sale = Sale::where('customer_id', $customer->id)->first();

        if (!$Sale) {
            $Sale = new Sale();
            $Sale->sales_date = $request->input('sales_date');
            $Sale->total_price = 0;
            $Sale->customer_id = $customer->id;
            $Sale->user_id = '1';
            $Sale->save();
        }

        $total_price = $Sale->total_price;
    
        foreach ($request->input('details') as $detail) {
            $product = Product::findOrFail($detail['product_id']);
            $sub_total = $product->price * $detail['amount'];
            $total_price += $sub_total;
    
            $Detail = new Detail();
            $Detail->sale_id = $Sale->id;
            $Detail->product_id = $detail['product_id'];
            $Detail->amount = $detail['amount'];
            $Detail->sub_total = $sub_total; 
            $Detail->save();
    
            $product->stock -= $detail['amount'];
            $product->save();
        }
    
        $Sale->total_price = $total_price;
        $Sale->save();

        return redirect()->route('invoice.show', $Sale)->with('message', 'Pembelian berhasil ditambahkan');
    
        

        // $request->validate([
        //     'name' => 'required|string',
        //     'address' => 'required|string',
        //     'no_hp' => 'required|string|unique:customers,no_hp',
        // ]);        

        // // Buat pelanggan baru
        // $customer = new Customer();
        // $customer->name = $request->name;
        // $customer->address = $request->address;
        // $customer->no_hp = $request->no_hp;
        // $customer->save();
    }

    public function show(Sale $sale)
    {
        // Mengambil data-detail penjualan terkait
        $sale->load('details.product');
    
        // Mengirimkan data penjualan ke halaman invoice menggunakan Inertia
        return Inertia::render('Menus/Invoice', [
            'sale' => $sale,
        ]);
    }
    
}