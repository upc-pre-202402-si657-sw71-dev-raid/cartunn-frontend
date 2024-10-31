"use client"
import { usePathname } from "next/navigation";
import DrawerDashboard from "@/components/Drawer";

export default function WithNavbarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    let cadena = pathname.split('/');
    const typeUser = cadena[1];

    return (
        <>
            <DrawerDashboard typeUser={typeUser} />
            <main className="px-16 mt-4 " >
                {children}
            </main>
        </>
    );
}
