import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import usersRoute from '@/routes/users';

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

type User = {
    id: number;
    name: string;
    email: string;
    role: 0 | 1;
};

interface EditModalProps {
    user: User;
}

export function EditUserModal({ user }: EditModalProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const {
        data: editData,
        setData: setEditData,
        put: editPut,
        processing: editProcessing,
        errors: editErrors,
        reset: editReset,
    } = useForm({
        name: user.name,
        email: user.email,
        password: '',
    });

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        editPut(usersRoute.update({ user: user.id }).url, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editReset('password');
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        setEditData({
            name: user.name,
            email: user.email,
            password: '',
        });
    }, [user]);

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Edit
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Pengguna</DialogTitle>
                    <DialogDescription>
                        Perbarui detail untuk: {user.name}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitEdit} className="grid gap-4 py-4">
                    {/* Field Nama */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Nama</Label>
                        <Input id="edit-name" value={editData.name} onChange={(e) => setEditData('name', e.target.value)} className="col-span-3" />
                        <InputError message={editErrors.name} className="col-span-4 text-right" />
                    </div>
                    {/* Field Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">Email</Label>
                        <Input id="edit-email" type="email" value={editData.email} onChange={(e) => setEditData('email', e.target.value)} className="col-span-3" />
                        <InputError message={editErrors.email} className="col-span-4 text-right" />
                    </div>
                    {/* Field Password */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-password" className="text-right">Password</Label>
                        <Input id="edit-password" type="password" value={editData.password} onChange={(e) => setEditData('password', e.target.value)} className="col-span-3" placeholder="Kosongkan jika tidak diubah" />
                        <InputError message={editErrors.password} className="col-span-4 text-right" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Batal</Button></DialogClose>
                        <Button type="submit" disabled={editProcessing}>{editProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
