import { EditModal } from './EditModal';
import { DeleteDialog } from '@/components/DeleteDialog';
import productsRoute from '@/routes/products';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

interface ProductListProps {
    products: Product[];
}

function ProductImage({ image_url, name }: { image_url: string | null, name: string }) {
    if (image_url) {
        return (
            <img
                src={image_url}
                alt={name}
                className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
            />
        );
    }
    return (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            No Img
        </div>
    );
}

export function ProductList({ products }: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="mt-6 px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Belum ada data produk.
            </div>
        );
    }

    return (
        <div className="mt-6">
            {/* TAMPILAN DESKTOP (TABLE) */}
            <table className="hidden min-w-full divide-y divide-gray-200 dark:divide-neutral-700 md:table">
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
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <ProductImage image_url={product.image_url} name={product.name} />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                {product.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                {product.sku}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                {product.current_stock}
                            </td>
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
                                        <DeleteDialog
                                            itemName={product.name}
                                            route={productsRoute.destroy({ product: product.id }).url}
                                            trigger={
                                                <DropdownMenuItem
                                                    onSelect={(e) => e.preventDefault()}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            }
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* TAMPILAN MOBILE (CARDS) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <ProductImage image_url={product.image_url} name={product.name} />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        SKU: {product.sku}
                                    </p>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="-mr-2 h-8 w-8 p-0">
                                        <span className="sr-only">Buka menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <EditModal product={product} />
                                    <DeleteDialog
                                        itemName={product.name}
                                        route={productsRoute.destroy({ product: product.id }).url}
                                        trigger={
                                            <DropdownMenuItem
                                                onSelect={(e) => e.preventDefault()}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                Hapus
                                            </DropdownMenuItem>
                                        }
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 dark:border-neutral-700">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Stok Saat Ini:
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {product.current_stock}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
