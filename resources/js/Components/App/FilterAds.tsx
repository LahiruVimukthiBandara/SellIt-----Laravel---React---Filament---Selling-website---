import React, { useEffect, useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";

interface FilterAdsProps {
    filters: {
        category: string;
        start_price: string;
        end_price: string;
        province: string;
        district: string;
        division: string;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            category: string;
            start_price: string;
            end_price: string;
            province: string;
            district: string;
            division: string;
        }>
    >;
}

export default function FilterAds({ filters, setFilters }: FilterAdsProps) {
    const [categories, setCategories] = useState([]);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        axios.get("/api/categories").then((res) => {
            setCategories(res.data.data || res.data);
        });
        axios.get("/api/province").then((res) => {
            setProvinces(res.data.data || res.data);
        });
    }, []);

    const onChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            ...(key === "province" ? { district: "", division: "" } : {}),
            ...(key === "district" ? { division: "" } : {}),
        }));
    };

    const selectedProvince = provinces.find(
        (p: any) => p.id === Number(filters.province)
    );
    const selectedDistrict = selectedProvince?.districts.find(
        (d: any) => d.id === Number(filters.district)
    );

    return (
        <>
            <Head title="All Ads" />
            <div className="">
                <h1 className="capitalize font-bold">filter your adds</h1>
                <div className="divider"></div>
            </div>
            <div className="flex flex-col gap-5">
                <button
                    type="button"
                    className="btn btn-sm btn-primary mt-4"
                    onClick={() =>
                        setFilters({
                            category: "",
                            start_price: "",
                            end_price: "",
                            province: "",
                            district: "",
                            division: "",
                        })
                    }
                >
                    Clear Filters
                </button>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="category"
                        className="capitalize text-sm font-semibold"
                    >
                        By category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => onChange("category", e.target.value)}
                        className="select select-md"
                    >
                        <option value="" disabled>
                            Pick a category
                        </option>
                        {categories.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="border-b"></div>
                {/* Price range */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="category"
                        className="capitalize text-sm font-semibold"
                    >
                        By price range
                    </label>
                    <input
                        type="text"
                        placeholder="Start Price"
                        value={filters.start_price}
                        onChange={(e) =>
                            onChange("start_price", e.target.value)
                        }
                        className="input input-md"
                    />
                    <input
                        type="text"
                        placeholder="End Price"
                        value={filters.end_price}
                        onChange={(e) => onChange("end_price", e.target.value)}
                        className="input input-md"
                    />
                </div>

                <div className="border-b"></div>
                {/* Location */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="category"
                        className="capitalize text-sm font-semibold"
                    >
                        By location
                    </label>
                    <select
                        value={filters.province}
                        onChange={(e) => onChange("province", e.target.value)}
                        className="select select-md"
                    >
                        <option value="" disabled>
                            Province
                        </option>
                        {provinces.map((p: any) => (
                            <option key={p.id} value={p.id}>
                                {p.province}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.district}
                        onChange={(e) => onChange("district", e.target.value)}
                        className="select select-md"
                    >
                        <option value="" disabled>
                            District
                        </option>
                        {selectedProvince?.districts.map((d: any) => (
                            <option key={d.id} value={d.id}>
                                {d.district}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.division}
                        onChange={(e) => onChange("division", e.target.value)}
                        className="select select-md"
                    >
                        <option value="" disabled>
                            Division
                        </option>
                        {selectedDistrict?.divisions.map((div: any) => (
                            <option key={div.id} value={div.id}>
                                {div.division}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
