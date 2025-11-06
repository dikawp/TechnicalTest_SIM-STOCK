import { useState, type ReactNode } from 'react';
import { router } from '@inertiajs/react';
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

interface DeleteDialogProps {
    itemName: string;
    route: string;
    trigger: ReactNode;
}

export function DeleteDialog({ itemName, route, trigger }: DeleteDialogProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const submitDelete = () => {
        router.delete(route, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apakah Anda yakin?</DialogTitle>
                    <DialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus
                        <span className="font-medium"> {itemName} </span>
                        secara permanen.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={submitDelete}
                    >
                        Ya, Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
