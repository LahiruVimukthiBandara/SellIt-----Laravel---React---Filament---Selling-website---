import ApplicationLogo from "@/Components/Core/ApplicationLogo";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { IoMdImages } from "react-icons/io";
import { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateAd() {
    const [categories, setCategories] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        axios.get("/api/categories").then((res) => {
            setCategories(res.data.data || res.data);
        });
        axios.get("/api/province").then((res) => {
            setProvinces(res.data.data || res.data);
        });
    }, []);

    // get data
    const { data, post, setData, reset, processing, errors } = useForm({
        main_category_id: "",
        sub_category_id: "",
        province_id: "",
        districts_id: "",
        divisions_id: "",
        address: "",
        title: "",
        description: "",
        price: "",
        image: [] as File[],
    });

    // categories
    const selectedMainCategory = categories.find(
        (c: any) => c.id === Number(data.main_category_id)
    );

    // province district divition
    const selectedProvince = provinces.find(
        (p: any) => p.id === Number(data.province_id)
    );
    const selectedDistrict = selectedProvince?.districts.find(
        (d: any) => d.id === Number(data.districts_id)
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("ads.store"), {
            onFinish: () => {
                toast.success("Ad created successfully");
                router.get(route("adds"));
            },
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Free Ad" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* header */}
                    <div className="flex flex-col w-full">
                        <div>
                            <h1 className="flex items-center gap-2 capitalize md:font-extrabold md:gap-3 md:text-3xl ">
                                <ApplicationLogo /> Create Your free add and get
                                sell<span className="text-primary">It</span>
                                fast
                            </h1>
                        </div>
                        <div className="divider"></div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                className="flex flex-col w-full gap-2"
                            >
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {/* COL01 add content */}
                                    <div className="flex flex-col gap-5">
                                        {/* title */}
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="title"
                                                className="text-sm"
                                            >
                                                Ad Title
                                            </label>
                                            <TextInput
                                                className="text-sm"
                                                placeholder="Ad Title.."
                                                name="title"
                                                id="title"
                                                tabIndex={1}
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* description */}
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="description"
                                                className="text-sm"
                                            >
                                                Ad Description
                                            </label>
                                            <textarea
                                                className="w-full text-sm textarea"
                                                placeholder="Ad Description.."
                                                name="description"
                                                id="description"
                                                tabIndex={2}
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* category */}
                                        <div className="flex flex-col gap-1">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label
                                                        htmlFor="main_category_id"
                                                        className="text-sm"
                                                    >
                                                        Main category
                                                    </label>
                                                    <select
                                                        className="select"
                                                        value={
                                                            data.main_category_id
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "main_category_id",
                                                                e.target.value
                                                            );
                                                            setData(
                                                                "sub_category_id",
                                                                ""
                                                            );
                                                        }}
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Pick a category
                                                        </option>
                                                        {categories.map(
                                                            (c: any) => (
                                                                <option
                                                                    key={c.id}
                                                                    value={c.id}
                                                                >
                                                                    {
                                                                        c.category_name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="sub_category_id"
                                                        className="text-sm"
                                                    >
                                                        Sub category
                                                    </label>
                                                    <select
                                                        value={
                                                            data.sub_category_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sub_category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full select select-md"
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            {selectedMainCategory
                                                                ? "Pick a subcategory"
                                                                : "Select main category first"}
                                                        </option>
                                                        {selectedMainCategory?.sub_categories?.map(
                                                            (sc: any) => (
                                                                <option
                                                                    key={sc.id}
                                                                    value={
                                                                        sc.id
                                                                    }
                                                                >
                                                                    {
                                                                        sc.sub_category_name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* location */}
                                        <div className="flex flex-col gap-1">
                                            <div className="grid grid-cols-3 gap-2">
                                                {/* province */}
                                                <div>
                                                    <label
                                                        htmlFor="main_category_id"
                                                        className="text-sm"
                                                    >
                                                        Province
                                                    </label>

                                                    <select
                                                        className="select "
                                                        value={data.province_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "province_id",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Province
                                                        </option>
                                                        {provinces.map(
                                                            (p: any) => (
                                                                <option
                                                                    value={p.id}
                                                                    key={p.id}
                                                                >
                                                                    {p.province}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                {/* district */}
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        htmlFor="districts_id"
                                                        className="text-sm"
                                                    >
                                                        District
                                                    </label>
                                                    <select
                                                        className="select "
                                                        value={
                                                            data.districts_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "districts_id",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            select District
                                                        </option>
                                                        {selectedProvince?.districts.map(
                                                            (d: any) => (
                                                                <option
                                                                    key={d.id}
                                                                    value={d.id}
                                                                >
                                                                    {d.district}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                {/* division */}
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        htmlFor="divisions_id"
                                                        className="text-sm"
                                                    >
                                                        Division
                                                    </label>
                                                    <select
                                                        className="select"
                                                        value={
                                                            data.divisions_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "divisions_id",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            select Division
                                                        </option>
                                                        {selectedDistrict?.divisions.map(
                                                            (di: any) => (
                                                                <option
                                                                    key={di.id}
                                                                    value={
                                                                        di.id
                                                                    }
                                                                >
                                                                    {
                                                                        di.division
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* address */}
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="address"
                                                className="text-sm"
                                            >
                                                Located Address
                                            </label>
                                            <TextInput
                                                className="text-sm"
                                                name="address"
                                                id="address"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* price */}
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="price"
                                                className="text-sm"
                                            >
                                                Price
                                            </label>
                                            <div className="relative">
                                                <span className="absolute text-sm text-gray-500 -translate-y-1/2 left-3 top-1/2">
                                                    Rs
                                                </span>
                                                <TextInput
                                                    className="w-full pl-10 text-sm"
                                                    name="price"
                                                    id="price"
                                                    value={data.price}
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* COL02 add images */}
                                    <div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="image"
                                                className="text-sm"
                                            >
                                                Upload Images
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (!e.target.files) return;

                                                    const files = Array.from(
                                                        e.target.files
                                                    );
                                                    setData("image", files);

                                                    const previews = files.map(
                                                        (file) =>
                                                            URL.createObjectURL(
                                                                file
                                                            )
                                                    );
                                                    setPreviewImages(previews);
                                                }}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="image"
                                                className="w-full text-sm normal-case btn btn-outline btn-primary"
                                            >
                                                <IoMdImages /> Choose Images
                                            </label>
                                        </div>
                                        {previewImages.length > 0 && (
                                            <div className="flex flex-wrap gap-4 mt-4">
                                                {previewImages.map(
                                                    (src, index) => (
                                                        <img
                                                            key={index}
                                                            src={src}
                                                            alt={`preview-${index}`}
                                                            className="object-cover w-24 h-24 border rounded"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-6">
                                    <PrimaryButton
                                        className="ms-4 btn btn-primary"
                                        disabled={processing}
                                    >
                                        Create Add Free
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
