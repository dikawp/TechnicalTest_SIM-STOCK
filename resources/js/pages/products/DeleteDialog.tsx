import { useState } from 'react';
import { router } from '@inertiajs/react';
import productsRoute from '@/routes/products';

// UI Components
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

interface DeleteDialogProps {
    product: Product;
}

export function DeleteDialog({ product }: DeleteDialogProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const submitDelete = () => {
        setIsProcessing(true);
        router.delete(productsRoute.destroy({ product: product.id }).url, {
            onFinish: () => setIsProcessing(false),
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                >
                    Hapus
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apakah Anda yakin?</DialogTitle>
                    <DialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus produk{' '}
                        <span className="font-semibold">{product.name}</span> secara permanen.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" disabled={isProcessing}>
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={submitDelete}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Menghapus...' : 'Ya, Hapus'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
