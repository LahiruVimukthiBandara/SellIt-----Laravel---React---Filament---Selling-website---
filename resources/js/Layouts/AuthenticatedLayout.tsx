import Footer from "@/Components/App/Footer";
import Navbar from "@/Components/App/Navbar";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div data-theme="light" className="min-h-screen antialiased">
                <div className="bg-white border-b border-gray-100">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Toaster position="top-right" />
                        <Navbar />
                    </div>
                </div>

                {header && (
                    <header className="bg-white shadow">
                        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>

                <Footer />
            </div>
        </>
    );
}
