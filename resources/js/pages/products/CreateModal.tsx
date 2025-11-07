import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import productsRoute from '@/routes/products';

// UI Components
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/ui/input-error';

export function CreateModal() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        data: createData,
        setData: setCreateData,
        post: createPost,
        processing: createProcessing,
        errors: createErrors,
        reset: createReset,
    } = useForm({
        name: '',
        sku: '',
        current_stock: 0,
        image: null as File | null,
    });

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createPost(productsRoute.store().url, {
            forceFormData: true,
            onSuccess: () => {
                createReset();
                setImagePreview(null);
                setIsCreateModalOpen(false);
            },
        });
    };

    useEffect(() => {
        if (!isCreateModalOpen) {
            createReset();
            setImagePreview(null);
        }
    }, [isCreateModalOpen]);

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button>Tambah Produk</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Tambah Produk Baru</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitCreate} className="grid gap-4 py-4">
                    {/* Nama */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-name" className="text-right">Nama</Label>
                        <Input
                            id="create-name"
                            value={createData.name}
                            onChange={(e) => setCreateData('name', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError message={createErrors.name} className="col-span-4 text-right" />
                    </div>

                    {/* SKU */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-sku" className="text-right">SKU</Label>
                        <Input
                            id="create-sku"
                            value={createData.sku}
                            onChange={(e) => setCreateData('sku', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError message={createErrors.sku} className="col-span-4 text-right" />
                    </div>

                    {/* Stok */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-stock" className="text-right">Stok Awal</Label>
                        <Input
                            id="create-stock"
                            type="number"
                            min={0}
                            value={createData.current_stock}
                            onChange={(e) => {
                                const val = e.target.value;
                                setCreateData('current_stock', val === '' ? 0 : parseInt(val, 10));
                            }}
                            className="col-span-3"
                        />
                        <InputError message={createErrors.current_stock} className="col-span-4 text-right" />
                    </div>

                    {/* Gambar */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="create-image" className="text-right">Gambar</Label>
                        <div className="col-span-3 space-y-2">
                            <Input
                                id="create-image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setCreateData('image', file);
                                    setImagePreview(file ? URL.createObjectURL(file) : null);
                                }}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded-lg border mt-2 max-h-40 object-contain"
                                />
                            )}
                        </div>
                        <InputError message={createErrors.image} className="col-span-4 text-right" />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={createProcessing}>
                            {createProcessing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
