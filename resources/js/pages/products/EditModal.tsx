import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/ui/input-error';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

interface EditModalProps {
    product: Product;
}

export function EditModal({ product }: EditModalProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(product.image_url);
    const [clearImage, setClearImage] = useState(false);

    const {
        data: editData,
        setData: setEditData,
        post: editPost, // gunakan post() agar forceFormData bekerja konsisten
        processing: editProcessing,
        errors: editErrors,
        reset: editReset,
    } = useForm({
        name: product.name,
        sku: product.sku,
        current_stock: product.current_stock,
        image: null as File | null,
        clear_image: false,
        _method: 'put',
    });

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();

        editPost(productsRoute.update({ product: product.id }).url, {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                editReset();
                setPreviewImage(product.image_url);
                setClearImage(false);
            },
        });
    };

    // Reset data tiap kali modal ditutup
    useEffect(() => {
        if (!isEditModalOpen) {
            editReset();
            setPreviewImage(product.image_url);
            setClearImage(false);
        }
    }, [isEditModalOpen, product.image_url]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setEditData('image', file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setClearImage(false);
            setEditData('clear_image', false);
        } else {
            setPreviewImage(product.image_url);
        }
    };

    const handleClearImageChange = (checked: boolean) => {
        setClearImage(checked);
        setEditData('clear_image', checked);
        if (checked) {
            setPreviewImage(null);
            setEditData('image', null);
        } else {
            setPreviewImage(product.image_url);
        }
    };

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Edit
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Edit Produk</DialogTitle>
                    <DialogDescription>
                        Perbarui detail produk: <strong>{product.name}</strong>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitEdit} className="grid gap-4 py-4">
                    {/* Nama */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Nama</Label>
                        <Input
                            id="edit-name"
                            value={editData.name}
                            onChange={(e) => setEditData('name', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError message={editErrors.name} className="col-span-4 text-right" />
                    </div>

                    {/* SKU */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-sku" className="text-right">SKU</Label>
                        <Input
                            id="edit-sku"
                            value={editData.sku}
                            onChange={(e) => setEditData('sku', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError message={editErrors.sku} className="col-span-4 text-right" />
                    </div>

                    {/* Stok */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-stock" className="text-right">Stok</Label>
                        <Input
                            id="edit-stock"
                            type="number"
                            min={0}
                            value={editData.current_stock}
                            onChange={(e) => {
                                const val = e.target.value;
                                setEditData('current_stock', val === '' ? 0 : parseInt(val, 10));
                            }}
                            className="col-span-3"
                        />
                        <InputError message={editErrors.current_stock} className="col-span-4 text-right" />
                    </div>

                    {/* Upload Gambar */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="edit-image" className="text-right">Gambar</Label>
                        <div className="col-span-3 space-y-2">
                            <Input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={clearImage}
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Product Preview"
                                    className="rounded-lg border mt-2 max-h-40 object-contain"
                                />
                            )}
                        </div>
                        <InputError message={editErrors.image} className="col-span-4 text-right" />
                    </div>

                    {/* Checkbox Hapus Gambar */}
                    {product.image_url && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="col-span-1" />
                            <div className="flex items-center space-x-2 col-span-3">
                                <Checkbox
                                    id="clear-image"
                                    checked={clearImage}
                                    onCheckedChange={handleClearImageChange}
                                />
                                <label
                                    htmlFor="clear-image"
                                    className="text-sm font-medium leading-none"
                                >
                                    Hapus gambar saat ini
                                </label>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={editProcessing}>
                            {editProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
