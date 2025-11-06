<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('name')->get();
        $movements = StockMovement::with('product')->latest()->take(50)->get();

        return response()->json([
            'products' => $products,
            'movements' => $movements
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:in,out',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:255',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $quantity = (int) $validated['quantity'];
        $type = $validated['type'];

        if ($type === 'out' && $quantity > $product->current_stock) {
            return response()->json([
                'message' => 'Stok tidak mencukupi.',
                'sisa_stok' => $product->current_stock,
            ], 422);
        }

        try {
            DB::transaction(function () use ($product, $type, $quantity, $validated) {
                StockMovement::create([
                    'product_id' => $product->id,
                    'type' => $type,
                    'quantity' => $quantity,
                    'notes' => $validated['notes'] ?? null,
                ]);

                if ($type === 'in') {
                    $product->increment('current_stock', $quantity);
                } else {
                    $product->decrement('current_stock', $quantity);
                }
            });

            return response()->json([
                'message' => 'Stok berhasil diperbarui.',
                'product' => $product->fresh(),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memproses stok.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
