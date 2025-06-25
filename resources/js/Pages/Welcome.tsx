import CategoryLinks from "@/Components/App/CategoryLinks";
import FeaturedAdds from "@/Components/App/FeaturedAdds";
import HomeCard from "@/Components/App/HomeCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoMdArrowDropdown } from "react-icons/io";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import MainAdds from "@/Components/App/MainAdds";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="bg-primary p-5 h-64 flex flex-col justify-center items-center text-white text-center">
                <h1 className="md:text-5xl text-2xl font-extrabold px-4">
                    Publish Your Ads Free With SellIt
                </h1>
                <p className="text-gray-400 text-xs md:w-[500px] w-[280px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet ipsum porro asperiores iste facilis, nesciunt delectus.
                    Odit, saepe quos illo eligendi natus officia quasi aperiam
                    fuga non obcaecati impedit tenetur!
                </p>
                <div className="flex flex-col md:pt-10 pt-5 items-center">
                    <h1 className="md:text-xl font-bold">Discover More</h1>
                    <IoMdArrowDropdown className="text-3xl" />
                </div>
            </div>

            <div className="bg-white border-b border-gray-100">
                <div className="md:py-10 pb-10 mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* adds */}
                    <div>
                        <MainAdds />
                    </div>
                    {/* categories */}
                    <div>
                        <CategoryLinks />
                    </div>
                    <div className="divider"></div>
                    {/* featured adds */}
                    <div className="py-10">
                        <FeaturedAdds />
                    </div>
                    <div className="divider"></div>
                    {/* description card */}
                    <div>
                        <HomeCard />
                    </div>
                    {/* adds */}
                    <div className=" mt-10">
                        <MainAdds />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
