import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { Package } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang di SIM-STOCK" />
            <div className="flex min-h-screen flex-col bg-neutral-100 dark:bg-neutral-950">

                <header className="absolute top-0 left-0 right-0 z-10 p-6">
                    <nav className="mx-auto flex max-w-5xl items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
                            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                SIM-STOCK
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 ring-offset-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-neutral-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex flex-1 items-center justify-center">
                    <div className="relative flex max-w-3xl flex-col items-center px-6 py-32 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl dark:text-neutral-100">
                            Selamat Datang di<br></br>
                            <span className="text-blue-600 dark:text-blue-500">SIM-STOCK</span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
                            Sebuah aplikasi web simulasi manajemen stok yang dibangun untuk
                            memenuhi *Technical Test*. Dibuat menggunakan Laravel, React,
                            Inertia.js, dan Tailwind CSS.
                        </p>


                        {!auth.user && (
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={login()}
                                    className="rounded-md bg-neutral-800 px-5 py-3 text-sm font-semibold text-neutral-100 shadow-sm transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-300"
                                >
                                    Mulai Kelola Stok
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
