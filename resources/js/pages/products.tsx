import AppLayout from '@/layouts/app-layout';
import productsRoute from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreateModal } from './products/CreateModal';
import { EditModal } from './products/EditModal';
import { DeleteDialog } from './products/DeleteDialog';

// UI Components
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

// === Tipe data ===
type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

type PageProps = {
    products: Product[];
};

// === Breadcrumbs ===
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoute.index().url,
    },
];

// === KOMPONEN UTAMA ===
export default function Products() {
    const { products } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                            Daftar Produk
                        </h2>
                        <CreateModal />
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    {['Gambar', 'Nama', 'SKU', 'Stok Saat Ini', 'Aksi'].map((title, i) => (
                                        <th
                                            key={i}
                                            className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ${title === 'Aksi' ? 'text-right' : 'text-left'
                                                }`}
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-neutral-900">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            {/* Gambar Produk */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-12 w-12 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">Tidak ada gambar</span>
                                                )}
                                            </td>

                                            {/* Nama */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {product.name}
                                            </td>

                                            {/* SKU */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {product.sku}
                                            </td>

                                            {/* Stok */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {product.current_stock}
                                            </td>

                                            {/* Aksi */}
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Buka menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <EditModal product={product} />
                                                        <DeleteDialog product={product} />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
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
