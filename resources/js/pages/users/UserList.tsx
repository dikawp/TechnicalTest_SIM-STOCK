import { Head, usePage, useForm, router } from '@inertiajs/react';
import usersRoute from '@/routes/users';

import { EditUserModal } from './EditModal';
import { DeleteDialog } from '@/components/DeleteDialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

// Tipe data
type User = {
    id: number;
    name: string;
    email: string;
    role: 0 | 1;
};

interface UserListProps {
    users: User[];
}

function RoleBadge({ role }: { role: 0 | 1 }) {
    const isAdmin = role === 1;
    const className = `px-2 py-1 text-xs font-medium rounded-full ${isAdmin
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`;

    return <span className={className}>{isAdmin ? 'Admin' : 'Staff'}</span>;
}

export function UserList({ users }: UserListProps) {
    if (users.length === 0) {
        return (
            <div className="mt-6 px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada pengguna lain.
            </div>
        );
    }

    return (
        <div className="mt-6">
            {/* TAMPILAN DESKTOP (TABLE) */}
            <table className="hidden min-w-full divide-y divide-gray-200 dark:divide-neutral-700 md:table">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                        <th className="px-6 py-3 text-left ...">Nama</th>
                        <th className="px-6 py-3 text-left ...">Email</th>
                        <th className="px-6 py-3 text-left ...">Role</th>
                        <th className="px-6 py-3 text-right ...">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-neutral-900">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 ...">{user.name}</td>
                            <td className="px-6 py-4 ...">{user.email}</td>
                            <td className="px-6 py-4 ...">
                                <RoleBadge role={user.role} />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right ...">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Buka menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <EditUserModal user={user} />
                                        <DeleteDialog
                                            itemName={user.name}
                                            route={usersRoute.destroy({ user: user.id }).url}
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
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="-mr-2 h-8 w-8 p-0">
                                        <span className="sr-only">Buka menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <EditUserModal user={user} />
                                    <DeleteDialog
                                        itemName={user.name}
                                        route={usersRoute.destroy({ user: user.id }).url}
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
                                Role:
                            </p>
                            <RoleBadge role={user.role} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
