import React from "react";
import AgricultureIcon from "@/Components/icons/AgricultureIcon";
import AnimalIcon from "@/Components/icons/AnimalIcon";
import BallIcon from "@/Components/icons/BallIcon";
import BusinessIcon from "@/Components/icons/BusinessIcon";
import DoorIcon from "@/Components/icons/DoorIcon";
import EducationIcon from "@/Components/icons/EducationIcon";
import ElectronicIcon from "@/Components/icons/ElectronicIcon";
import FoodIcon from "@/Components/icons/FoodIcon";
import HomeGarden from "@/Components/icons/HomeGarden";
import HomeIcon from "@/Components/icons/HomeIcon";
import JobIcon from "@/Components/icons/JobIcon";
import MobileIcon from "@/Components/icons/MobileIcon";
import OverseaIcon from "@/Components/icons/OverseaIcon";
import ServiceIcon from "@/Components/icons/ServiceIcon";
import VehicleIcon from "@/Components/icons/VehicleIcon";
import WatchIcon from "@/Components/icons/WatchIcon";
import { Link } from "@inertiajs/react";

export default function CategoryLinks() {
    return (
        <>
            <div className="py-5 px-5 md:px-0">
                <h1 className="capitalize font-bold text-lg md:text-xl">
                    Browse items by category
                </h1>
            </div>

            <div className="sm:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-5 md:px-0 sm:overflow-visible overflow-x-auto flex sm:flex-none flex-nowrap scrollbar-hide">
                {[
                    {
                        icon: <HomeIcon />,
                        label: "Property",
                        link: "/adds",
                    },
                    {
                        icon: <MobileIcon />,
                        label: "Mobile",
                        link: "/adds",
                    },
                    {
                        icon: <ElectronicIcon />,
                        label: "Electronic",
                        link: "/adds",
                    },
                    {
                        icon: <VehicleIcon />,
                        label: "Vehicles",
                        link: "/adds",
                    },
                    {
                        icon: <HomeGarden />,
                        label: "Home & Garden",
                        link: "/adds",
                    },
                    {
                        icon: <ServiceIcon />,
                        label: "Services",
                        link: "/adds",
                    },
                    {
                        icon: <BusinessIcon />,
                        label: "Business & Industry",
                        link: "/adds",
                    },
                    {
                        icon: <JobIcon />,
                        label: "Jobs",
                        link: "/adds",
                    },
                    {
                        icon: <BallIcon />,
                        label: "Hobby, Sport & Kids",
                        link: "/adds",
                    },
                    {
                        icon: <AnimalIcon />,
                        label: "Animals",
                        link: "/adds",
                    },
                    {
                        icon: <WatchIcon />,
                        label: "Fashion & Beauty",
                        link: "/adds",
                    },
                    {
                        icon: <EducationIcon />,
                        label: "Education",
                        link: "/adds",
                    },
                    {
                        icon: <FoodIcon />,
                        label: "Essentials",
                        link: "/adds",
                    },
                    {
                        icon: <AgricultureIcon />,
                        label: "Agriculture",
                        link: "/adds",
                    },
                    {
                        icon: <OverseaIcon />,
                        label: "Work Oversea",
                        link: "/adds",
                    },
                    {
                        icon: <DoorIcon />,
                        label: "Other",
                        link: "/adds",
                    },
                ].map((item, idx) => (
                    <Link
                        href={`/adds?category=${encodeURIComponent(
                            item.label
                        )}`}
                        key={idx}
                    >
                        <div className="flex flex-col items-center hover:shadow-md transition-shadow bg-white min-w-[80px] p-3 sm:min-w-0">
                            <div className="mb-2">{item.icon}</div>
                            <div className="text-center text-xs md:text-sm">
                                <h2 className="font-medium">{item.label}</h2>
                                <p className="text-gray-500">1587 ads</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
