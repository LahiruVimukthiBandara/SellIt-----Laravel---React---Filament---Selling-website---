import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "@inertiajs/react";

interface Ad {
    id: number;
    title: string;
    description: string;
    price?: number;
    images: { id: number; image_path: string }[];
    user?: { id: number; first_name: string };
    province?: { id: number; province: string };
    district?: { id: number; district: string };
    division?: { id: number; division: string };
    main_category?: { id: number; category_name: string };
    sub_category?: { id: number; sub_category_name: string };
}

interface Filters {
    category: string;
    start_price: string;
    end_price: string;
    province: string;
    district: string;
    division: string;
}

interface Props {
    search: string;
    filters: Filters;
}

export default function AllAdds({ search, filters }: Props) {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const imageUrl = "http://127.0.0.1:8000/storage/";

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/ads", {
                    params: {
                        search,
                        category: filters.category,
                        start_price: filters.start_price,
                        end_price: filters.end_price,
                        province: filters.province,
                        district: filters.district,
                        division: filters.division,
                    },
                });
                setAds(res.data.data || res.data);
            } catch (err) {
                console.error("Failed to fetch ads", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [search, JSON.stringify(filters)]);

    if (loading) return <div>Searching Adds...</div>;

    return (
        <div className="grid grid-cols-1 gap-3">
            {ads.length === 0 && (
                <div className="col-span-full">Sorry No ads found....</div>
            )}

            {ads.map((ad) => (
                <Link href={route("ads.show", ad.id)}>
                    <div key={ad.id} className="p-4 border rounded shadow-sm">
                        {ad.images && ad.images.length > 0 && (
                            <img
                                src={imageUrl + ad.images[0].image_path}
                                alt={ad.title}
                                className="object-cover w-full h-40 rounded"
                            />
                        )}

                        <h3 className="mt-2 text-lg font-semibold">
                            {ad.title}
                        </h3>
                        <p className="text-gray-600">
                            {ad.description.slice(0, 50)}
                            {ad.description.length > 50 && "..."}
                        </p>

                        {ad.price && (
                            <p className="font-semibold text-primary">
                                Price: Rs {ad.price}
                            </p>
                        )}

                        {/* Relational info */}
                        <p className="text-sm text-gray-500">
                            Category: {ad.main_category?.category_name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Location: {ad.province?.province || "—"},
                            {ad.district?.district || "—"},
                            {ad.division?.division || "—"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Posted by: {ad.user?.first_name || "Unknown"}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
