<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index()
    {
        return Inertia::render('stock', [
            'products' => Product::orderBy('name')->get(),
            'movements' => StockMovement::with('product')->latest()->take(50)->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:in,out',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:255',
        ]);

        $product = Product::findOrFail($request->product_id);
        $quantity = (int)$request->quantity;
        $type = $request->type;

        if ($type === 'out' && $quantity > $product->current_stock) {
            throw ValidationException::withMessages([
                'quantity' => 'Stok tidak mencukupi. Sisa stok: ' . $product->current_stock,
            ]);
        }

        try {
            DB::transaction(function () use ($product, $type, $quantity, $request) {

                StockMovement::create([
                    'product_id' => $product->id,
                    'type' => $type,
                    'quantity' => $quantity,
                    'notes' => $request->notes,
                ]);

                if ($type === 'in') {
                    $product->increment('current_stock', $quantity);
                } else {
                    $product->decrement('current_stock', $quantity);
                }
            });
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'general' => 'Terjadi kesalahan saat memproses stok: ' . $e->getMessage(),
            ]);
        }

        return redirect()->route('stock.index')->with('success', 'Stok berhasil diperbarui.');
    }
}
