// resources/js/pages/Dashboard.tsx

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface Stats {
    totalProducts: number;
    totalStock: number;
    lowStockCount: number;
}

interface ChartData {
    date: string;
    total_in: number;
    total_out: number;
}

interface PageProps {
    [key: string]: unknown;
    stats: Stats;
    chartData: ChartData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { stats, chartData } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-4">

                {/* Card 1: Total Produk */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-neutral-500">
                            Total Produk
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                            {stats.totalProducts}
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Total Stok */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-neutral-500">
                            Total Stok (Semua Produk)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                            {stats.totalStock}
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Stok Hampir Habis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-neutral-500">
                            Produk Hampir Habis (&lt; 10)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                            {stats.lowStockCount}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Card Grafik */}
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Pergerakan Stok (7 Hari Terakhir)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(str) => new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'black',
                                        borderColor: 'gray',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="total_in"
                                    name="Stok Masuk"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total_out"
                                    name="Stok Keluar"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
