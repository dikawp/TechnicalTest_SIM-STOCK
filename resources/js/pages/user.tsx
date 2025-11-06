import AppLayout from '@/layouts/app-layout';
import usersRoute from '@/routes/users';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { UserList } from './users/UserList';

type User = {
    id: number;
    name: string;
    email: string;
    role: 0 | 1;
};

interface PageProps {
    [key: string]: unknown;
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola User',
        href: usersRoute.index().url,
    },
];

export default function Users() {
    const { users } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">

                    <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                        Daftar Pengguna
                    </h2>

                    <UserList users={users} />

                </div>
            </div>
        </AppLayout>
    );
}
