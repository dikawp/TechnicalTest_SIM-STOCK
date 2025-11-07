import AppLayout from '@/layouts/app-layout';
import productsRoute from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { CreateModal } from './products/CreateModal';
import { ProductList } from './products/ProductList';

type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

type PageProps = {
    [key: string]: unknown;
    products: Product[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoute.index().url,
    },
];

export default function Products() {
    const { products } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                            Daftar Produk
                        </h2>
                        <CreateModal />
                    </div>

                    <ProductList products={products} />

                </div>
            </div>
        </AppLayout>
    );
}
