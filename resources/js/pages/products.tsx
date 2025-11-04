// resources/js/Pages/Products.tsx

import AppLayout from '@/layouts/app-layout';
import productsRoute from '@/routes/products'; // Kita ganti nama import agar tidak bentrok
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react'; // <-- TAMBAHKAN usePage

// Definisikan tipe data untuk satu produk
type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
};

// Definisikan tipe untuk props yang kita terima dari controller
type PageProps = {
    products: Product[];
    // tambahkan props lain jika ada (misal: auth)
};

// Breadcrumbs tetap sama
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoute.index().url,
    },
];

export default function Products() {
    // Ambil prop 'products' yang dikirim dari ProductController
    const { products } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">

                    {/* Judul Halaman */}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Daftar Produk
                    </h2>

                    {/* TODO: Tambahkan tombol "Tambah Produk" di sini nanti */}

                    {/* Daftar Produk */}
                    <div className="mt-6">
                        {/* Kita buat tabel sederhana */}
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nama</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">SKU</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Stok Saat Ini</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-neutral-900">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.sku}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.current_stock}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                            Belum ada data produk.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
