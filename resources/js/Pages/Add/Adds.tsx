import React, { useEffect, useState } from "react";
import AllAdds from "@/Components/App/AllAdds";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/Core/TextInput";
import FilterAds from "@/Components/App/FilterAds";
import MainAdds from "@/Components/App/MainAdds";

export default function Adds() {
    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        category: "",
        start_price: "",
        end_price: "",
        province: "",
        district: "",
        division: "",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryFromURL = params.get("category");

        if (categoryFromURL) {
            setFilters((prev) => ({
                ...prev,
                category: categoryFromURL,
            }));
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="bg-white border-b border-gray-100">
                <div className="md:py-10 pb-10 mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Main banner ads */}
                    <div className="py-5">
                        <MainAdds />
                    </div>

                    {/* Search */}
                    <div className="w-full flex justify-end items-center gap-3 h-auto pb-3">
                        <div className="ml-auto w-[350px]">
                            <TextInput
                                type="search"
                                placeholder="Search . . . . ."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {filters.category && (
                        <div className="text-sm text-primary font-semibold mb-4">
                            Showing results for category:{" "}
                            <span className="capitalize">
                                {filters.category}
                            </span>
                        </div>
                    )}

                    {/* Filters and Ads */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 border-t md:border-r border-gray-200">
                            <FilterAds
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </div>

                        <div className="p-3 col-span-2 border-t border-gray-200">
                            <AllAdds search={search} filters={filters} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
