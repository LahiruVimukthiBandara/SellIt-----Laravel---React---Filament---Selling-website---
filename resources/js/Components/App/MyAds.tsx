import { Link } from "@inertiajs/react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

export default function MyAds() {
    const [myAds, setMyAds] = useState<Ad[]>([]);
    const imageUrl = "http://127.0.0.1:8000/storage";

    const fetchMyAds = async () => {
        try {
            const res = await axios.get("/myAds");
            setMyAds(res.data.data || res.data);
        } catch (err) {
            console.error("Error getting ads", err);
        }
    };

    useEffect(() => {
        fetchMyAds();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this ad?"
        );
        if (!confirmed) return;

        try {
            await axios.delete(`/ads/${id}`);
            toast.success("Ad deleted successfully");
            fetchMyAds();
        } catch (err) {
            console.error("Failed to delete ad", err);
            toast.error("Failed to delete ad. Please try again.");
            alert("Failed to delete. Please try again.");
        }
    };

    return (
        <div className="px-4">
            <div className="text-sm font-medium mb-2 text-gray-700">
                <h1 className="text-xl capitalize text-primary font-bold">
                    {myAds.length} ads
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {myAds.map((ma) => (
                    <div
                        key={ma.id}
                        className="bg-white rounded-lg shadow-sm border hover:shadow-md h-full transition-all relative"
                    >
                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(ma.id)}
                            className="absolute top-2 right-2 z-10 btn btn-xs bg-red-500 text-white hover:bg-red-600 border-none"
                        >
                            <RiDeleteBin6Line />
                        </button>

                        {/* Link to Ad */}
                        <Link href={route("ads.show", ma.id)}>
                            <img
                                src={
                                    ma.images?.length > 0
                                        ? `${imageUrl}/${ma.images[0].image_path}`
                                        : "https://via.placeholder.com/300x160?text=No+Image"
                                }
                                alt={ma.title}
                                className="w-full h-32 object-cover rounded-t-lg"
                            />

                            <div className="p-3 text-sm">
                                <h3 className="font-semibold line-clamp-2 mb-1">
                                    {ma.title}
                                </h3>
                                <p className="text-green-600 font-bold text-xs">
                                    Rs {ma.price}
                                </p>
                                <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-1">
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                        {ma.main_category?.category_name}
                                    </span>
                                    <span>
                                        {ma.province?.province || "—"},{" "}
                                        {ma.district?.district || "—"}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
