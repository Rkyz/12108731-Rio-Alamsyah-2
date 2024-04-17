<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;


use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Menus/Food', [
            'categorys' =>  Category::withCount('products')->get()
        ]);
    }   

    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|unique:categories',
        ],[
            'category.required' => 'nama lu kosong dong',
        ]);

            $category = new Category([
            'category' => $data['category'],
        ]);
    
        $product->save();

        return redirect()->back->with('message', 'Category Berhasil Disimpan');
    }

    public function edit(Request $request, $id)
    {
        $request->validate([
            'category' => 'required|unique:categories',
        ],[
            'category.required' => 'category lu jangan kosong goblok',
            'category.unique' => 'category lu jangan sama goblok',
        ]);
    
        $data = Category::findOrFail($id);
        $data->update([
            'category' => $request->category,
        ]);
    
        return redirect()->back()->with('message', 'Category Berhasil Diedit');
    }
}
