import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import productsRoute from '@/routes/products';
import stockRoute from '@/routes/stock';
import usersRoute from '@/routes/users';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRightLeft, LayoutGrid, Package, Users } from 'lucide-react';
import AppLogo from './app-logo';

type User = {
    id: number;
    name: string;
    email: string;
    role: 1 | 0;
};

type PageProps = {
    auth: { user: User };
};


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Produk',
        href: productsRoute.index(),
        icon: Package,
    },
    {
        title: 'Manajemen Stok',
        href: stockRoute.index(),
        icon: ArrowRightLeft,
    },
    {
        title: 'Kelola User',
        href: usersRoute.index(),
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
];

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;

    const filteredNavItems = mainNavItems.filter(item => {
        const adminOnlyItems = ['Produk', 'Kelola User'];
        if (adminOnlyItems.includes(item.title)) {
            return auth.user.role === 1;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
