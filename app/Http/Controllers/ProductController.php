<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/Main', [
            'products' => Product::with('Category')->get(),
            'categorys' => Category::get()
        ]);
    }   

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|unique:products',
            'price' => 'required',
            'stock' => 'required',
        ],[
            'name.required' => 'nama lu kosong dong',
            'price.required' => 'price lu kosong dong',
            'stock.required' => 'stock lu kosong dong',
            'name.unique' => 'nama lu jan sama yah',
        ]);

            $product = new Product([
            'name' => $data['name'],
            'price' => $data['price'],
            'stock' => $data['stock'],
            'category_id' => $request->input('category_id'),
        ]);
    
        $product->save();

        return redirect('/product')->with('message', 'Product Berhasil Disimpan');
    }

    public function updateStok(Request $request, $id)
    {
        $request->validate([
            'stock' => 'required|min:1', 
        ],[
            'stock.required' => 'stock tidak boleh kosong',
            'stock.min' => 'stock tidak boleh 0'
        ]);
    
        $product = Product::findOrFail($id);
        $currentstock = $product->stock;
    
        $newstock = $currentstock + $request->stock;
        
        $product->update([
            'stock' => $newstock,
        ]);
    
        return redirect()->back()->with('message', 'Stok berhasil diperbarui');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('message', 'Product berhasil dihapus.');
    }

    public function show($category)
    {
       $category = Category::where('category', $category)->first();

       if (!$category) {
           abort(404, 'Kategori tidak ditemukan');
       }

       $products = $category->products;

       return Inertia::render('Menus/Menu', [
           'category' => $category,
           'products' => $products,
       ]);
    }
}
