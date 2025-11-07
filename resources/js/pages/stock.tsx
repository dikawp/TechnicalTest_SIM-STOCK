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

import { MovementList } from './stocks/StockList';

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
        general: null,
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

            {/* Layout Halaman */}
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
                                {/* Input Tipe */}
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
                                {/* Input Kuantitas */}
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
                                {/* Input Catatan */}
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
                                {/* Tombol Submit */}
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Memproses...' : 'Simpan'}
                                </Button>
                                <InputError message={errors.general} />
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <MovementList movements={movements} />
                </div>

            </div>
        </AppLayout>
    );
}
