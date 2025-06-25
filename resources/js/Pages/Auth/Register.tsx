import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="w-full h-full flex flex-col md:flex-row">
                {/* Left Side - Message */}
                <div className="w-full md:w-1/2 flex flex-col p-20 justify-center bg-primary text-white">
                    <h1 className="text-4xl font-extrabold mb-6 text-center md:text-left leading-tight">
                        Turn Your Unused Stuff into Cash with{" "}
                        <span className="text-yellow-300">SellIt</span>
                        <div className="h-[5px] rounded-full w-1/3 bg-white"></div>
                    </h1>
                    <p className="max-w-md text-sm leading-relaxed text-center md:text-left">
                        Welcome to <strong>SellIt</strong> — Sri Lanka’s trusted
                        marketplace where anyone can buy or sell almost
                        anything. Whether it's phones, fashion, vehicles,
                        property, or services, we make it easy to connect with
                        the right buyers or sellers. Join now, post your ad for
                        free, and be part of a growing community that trades
                        smartly and securely across the island.
                    </p>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-5 bg-white">
                    <div className=" w-full max-w-lg">
                        <div className="">
                            <h1 className="text-2xl font-bold mb-10 text-primary">
                                Register with Sellit
                            </h1>
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="first_name"
                                            value="First Name"
                                        />
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            autoComplete="first_name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.first_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="last_name"
                                            value="Last Name"
                                        />
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            autoComplete="last_name"
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.last_name}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Mobile Number"
                                        />
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            autoComplete="tel"
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center gap-3 justify-end">
                                    <Link
                                        href={route("login")}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Already registered?
                                    </Link>

                                    <PrimaryButton
                                        className="ms-4 btn btn-primary"
                                        disabled={processing}
                                    >
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
