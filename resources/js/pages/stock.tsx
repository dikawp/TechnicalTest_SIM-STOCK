// resources/js/pages/Stock.tsx

import AppLayout from '@/layouts/app-layout';
import stockRoute from '@/routes/stock';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/ui/input-error';

// --- Definisikan Tipe Lokal ---
type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

type StockMovement = {
    id: number;
    product: Product;
    type: 'in' | 'out';
    quantity: number;
    notes: string | null;
    created_at: string;
};

interface PageProps {
    [key: string]: unknown;
    products: Product[];
    movements: StockMovement[];
}

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Stok',
        href: stockRoute.index().url,
    },
];

export default function Stock() {
    const { products, movements } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: '',
        type: 'in' as 'in' | 'out',
        quantity: 1,
        notes: '',
        general: null, // Untuk error 'general'
    });

    const submitStock: FormEventHandler = (e) => {
        e.preventDefault();
        post(stockRoute.store().url, {
            onSuccess: () => reset('quantity', 'notes'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Stok" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 p-4">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Proses Stok</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitStock} className="grid gap-4">
                                {/* Input Produk */}
                                <div>
                                    <Label htmlFor="product_id">Produk</Label>
                                    <Select
                                        value={data.product_id}
                                        onValueChange={(value) => setData('product_id', value)}
                                    >
                                        <SelectTrigger id="product_id">
                                            <SelectValue placeholder="Pilih Produk..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map(product => (
                                                <SelectItem key={product.id} value={String(product.id)}>
                                                    {product.name} (Stok: {product.current_stock})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.product_id} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="type">Tipe</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value as 'in' | 'out')}>
                                        <SelectTrigger id="type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in">Stok Masuk</SelectItem>
                                            <SelectItem value="out">Stok Keluar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="quantity">Kuantitas</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="notes">Catatan (Opsional)</Label>
                                    <Input
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Misal: Stok opname"
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>

                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Memproses...' : 'Simpan'}
                                </Button>
                                <InputError message={errors.general} />
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Pergerakan Stok</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Waktu</th>
                                        <th className="px-6 py-3 text-left">Produk</th>
                                        <th className="px-6 py-3 text-left">Tipe</th>
                                        <th className="px-6 py-3 text-left">Kuantitas</th>
                                        <th className="px-6 py-3 text-left">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {movements.length > 0 ? (
                                        movements.map(move => (
                                            <tr key={move.id}>
                                                <td className="px-6 py-4">
                                                    {new Date(move.created_at).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4">{move.product?.name || 'Produk Dihapus'}</td>
                                                <td className={`px-6 py-4 ${move.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {move.type === 'in' ? 'Masuk' : 'Keluar'}
                                                </td>
                                                <td className="px-6 py-4">{move.quantity}</td>
                                                <td className="px-6 py-4">{move.notes}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center">
                                                Belum ada pergerakan stok.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </AppLayout>
    );
}
