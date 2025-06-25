import Navbar from "@/Components/App/Navbar";
import ApplicationLogo from "@/Components/Core/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        // <div
        //     data-theme="light"
        //     className="flex flex-col items-center h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0"
        // >
        //     <Navbar />
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
        <div
            data-theme="light"
            className="flex flex-col w-full h-screen bg-gray-100"
        >
            {children}
        </div>
    );
}
