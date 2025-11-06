import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Product = {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    image_url: string | null;
};

type StockMovement = {
    id: number;
    product: Product;
    type: 'in' | 'out';
    quantity: number;
    notes: string | null;
    created_at: string;
};

interface MovementListProps {
    movements: StockMovement[];
}

export function MovementList({ movements }: MovementListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Riwayat Pergerakan Stok</CardTitle>
            </CardHeader>
            <CardContent>
                {movements.length === 0 && (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                        Belum ada pergerakan stok.
                    </div>
                )}

                {/* TAMPILAN DESKTOP (TABLE)*/}
                {movements.length > 0 && (
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Waktu</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Produk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tipe</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Kuantitas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Catatan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-neutral-900">
                                {movements.map(move => (
                                    <tr key={move.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {new Date(move.created_at).toLocaleString('id-ID')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {move.product?.name || 'Produk Dihapus'}
                                        </td>
                                        <td className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${move.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                                            {move.type === 'in' ? 'Masuk' : 'Keluar'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {move.quantity}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {move.notes}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TAMPILAN MOBILE (CARDS) */}
                {movements.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {movements.map((move) => (
                            <div
                                key={move.id}
                                className="rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {move.product?.name || 'Produk Dihapus'}
                                        </p>
                                        <p className={`text-sm font-medium ${move.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                                            {move.type === 'in' ? 'Masuk' : 'Keluar'}: {move.quantity}
                                        </p>
                                        {move.notes && (
                                            <p className="mt-1 text-xs italic text-gray-500 dark:text-gray-400">
                                                {move.notes}
                                            </p>
                                        )}
                                    </div>
                                    <p className="flex-shrink-0 text-right text-xs text-gray-400">
                                        {new Date(move.created_at).toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
