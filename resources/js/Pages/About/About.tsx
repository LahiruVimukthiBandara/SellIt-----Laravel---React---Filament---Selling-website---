import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function About() {
    return (
        <AuthenticatedLayout>
            <Head title="About Us" />
            <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Who We Are
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We're on a mission to make buying and selling easy,
                            safe, and seamless. Whether you're listing your
                            first ad or browsing the marketplace, we're here to
                            support you.
                        </p>
                    </div>

                    {/* Values Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-primary">
                                Trust & Safety
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">
                                Your safety is our priority. We build features
                                to keep our users protected during every
                                transaction.
                            </p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-primary">
                                Simplicity
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">
                                We've designed everything to be intuitive and
                                easy to use — no tech skills required.
                            </p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-primary">
                                Community
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">
                                We believe in empowering local communities by
                                helping people connect and trade nearby.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
