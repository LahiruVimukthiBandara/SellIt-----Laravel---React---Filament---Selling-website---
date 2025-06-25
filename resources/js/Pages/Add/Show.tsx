import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactMarkdown from "react-markdown";
import { CiUser } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { Head } from "@inertiajs/react";

interface ShowProps {
    advertisement: any;
}

export default function Show({ advertisement }: ShowProps) {
    const [mainImage, setMainImage] = useState(
        advertisement.images?.[0]?.image_path || ""
    );

    const imageUrl = "http://127.0.0.1:8000/storage/";
    return (
        <AuthenticatedLayout>
            <Head title="Ad Details" />
            <div data-theme="light" className="min-h-screen">
                <div className="bg-white border-b border-gray-100">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-8">
                            {/* images */}
                            <div className="py-16">
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    {mainImage && (
                                        <div>
                                            <img
                                                src={imageUrl + mainImage}
                                                alt="Main Image"
                                                className="object-cover w-full h-auto max-w-xl rounded-lg"
                                            />
                                        </div>
                                    )}

                                    {/* Thumbnails */}
                                    <div className="flex flex-wrap gap-4">
                                        {advertisement.images?.map(
                                            (image: any) => (
                                                <img
                                                    key={image.id}
                                                    src={
                                                        imageUrl +
                                                        image.image_path
                                                    }
                                                    alt="Thumbnail"
                                                    onClick={() =>
                                                        setMainImage(
                                                            image.image_path
                                                        )
                                                    }
                                                    className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                                                        mainImage ===
                                                        image.image_path
                                                            ? "border-blue-500"
                                                            : "border-none"
                                                    }`}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* details */}
                            <div className="flex flex-col gap-1 py-16">
                                <div>
                                    <h1 className="text-xl font-bold capitalize text-primary">
                                        advertisement Details
                                    </h1>
                                    <div className="divider"></div>
                                </div>

                                <div className="text-3xl font-extrabold ">
                                    {advertisement.title}
                                </div>
                                <div className="flex gap-2 pb-2">
                                    <span className="badge badge-outline badge-warning">
                                        {
                                            advertisement.main_category
                                                ?.category_name
                                        }
                                    </span>
                                    <span className="badge badge-outline badge-warning">
                                        {
                                            advertisement.sub_category
                                                ?.sub_category_name
                                        }
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-green-600">
                                        Rs {advertisement.price}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <strong>
                                            <CiUser />
                                        </strong>
                                        <p>{advertisement.user?.first_name} </p>
                                        <p>{advertisement.user?.last_name} </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold capitalize">
                                        <LuPhoneCall />
                                    </span>
                                    <span className="text-primary">
                                        {advertisement.user?.phone}
                                    </span>
                                    |
                                    <span className="font-semibold capitalize">
                                        <MdOutlineEmail />
                                    </span>
                                    <span className="text-primary">
                                        {advertisement.user?.email}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 ">
                                    <strong className="text-red-500">
                                        <IoLocationOutline />
                                    </strong>{" "}
                                    <div className="flex items-center gap-2">
                                        <p>
                                            {advertisement.province?.province},
                                        </p>
                                        <p>
                                            {advertisement.district?.district},
                                        </p>
                                        <p>
                                            {advertisement.division?.division}
                                        </p>
                                    </div>
                                </div>
                                <div className="py-5 text-gray-600">
                                    <p className="text-gray-600 whitespace-pre-line">
                                        {advertisement.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
