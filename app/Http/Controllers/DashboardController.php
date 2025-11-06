<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $totalStock = Product::sum('current_stock');
        $lowStockCount = Product::where('current_stock', '<', 10)->count();
        $days = collect(range(6, 0))->map(fn($i) => now()->subDays($i)->format('Y-m-d'));

        $movements = StockMovement::query()
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->get()
            ->groupBy(fn($entry) => $entry->created_at->format('Y-m-d'))
            ->map(fn($day) => [
                'total_in' => $day->where('type', 'in')->sum('quantity'),
                'total_out' => $day->where('type', 'out')->sum('quantity'),
            ]);

        $chartData = $days->map(fn($date) => [
            'date' => $date,
            'total_in' => $movements->get($date)['total_in'] ?? 0,
            'total_out' => $movements->get($date)['total_out'] ?? 0,
        ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
            ],
            'chartData' => $chartData
        ]);
    }
}
