import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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

export default function CardCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [featuredAd, setFeaturedAds] = useState<Ad[]>([]);
    const imageUrl = "http://127.0.0.1:8000/storage";

    useEffect(() => {
        const featuredAds = async () => {
            try {
                const res = await axios.get("/featured");
                setFeaturedAds(res.data.data || res.data);
            } catch (err) {
                console.error("Failed to fetch featured ads", err);
            }
        };

        featuredAds();
    }, []);
    console.log(featuredAd);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollBy({
                left: e.deltaY,
            });
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <>
            <div className="text-xl font-bold capitalize px-5 pb-5">
                <h1>Featured adds</h1>
            </div>
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto scrollbar-hide px-2"
            >
                <div className="flex gap-4 w-max py-5">
                    {featuredAd.map((fa, index) => (
                        <Link href={route("ads.show", fa.id)}>
                            <div
                                key={index}
                                className="card relative w-80 min-w-[320px] h-full shadow-md bg-white"
                            >
                                <figure className="h-40 overflow-hidden">
                                    <img
                                        src={
                                            fa.images && fa.images.length > 0
                                                ? `${imageUrl}/${fa.images[0].image_path}`
                                                : "https://via.placeholder.com/300x160?text=No+Image"
                                        }
                                        alt={fa.title}
                                        className="object-cover w-full h-32"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-base font-semibold">
                                        {fa.title}
                                    </h2>
                                    <div className="w-full">
                                        <div className="flex gap-3">
                                            <div>
                                                <p className="font-semibold text-green-600">
                                                    Rs {fa.price}
                                                </p>
                                            </div>

                                            <p className="text-sm text-primary flex gap-2 items-center">
                                                <FaUserCheck />
                                                {fa.user?.first_name ||
                                                    "Unknown"}
                                            </p>
                                        </div>

                                        {/* Relational info */}
                                        <p className="text-gray-600 text-xs flex gap-2 items-center">
                                            <span className="badge badge-outline badge-warning">
                                                {
                                                    fa.main_category
                                                        ?.category_name
                                                }
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500 flex gap-2 items-center">
                                            {fa.province?.province || "—"},
                                            {fa.district?.district || "—"},
                                            {fa.division?.division || "—"}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute ">
                                    <div className="badge badge-warning text-white px-4 py-1 text-xs">
                                        <IoMdCheckmarkCircleOutline className="mr-1" />{" "}
                                        Featured
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
