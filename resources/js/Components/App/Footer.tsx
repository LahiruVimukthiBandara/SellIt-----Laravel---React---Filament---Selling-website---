import React from "react";
import ApplicationLogo from "../Core/ApplicationLogo";

export default function Footer() {
    return (
        <div data-theme="light" className="">
            <div className=" border-b border-gray-100">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="divider"></div>
                    <footer className="footer sm:footer-horizontal bg-white text-base-content p-10">
                        <aside>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-16 text-primary"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className=" font-bold">
                                Sell<span className="text-primary">It</span>.com
                                <br />
                                Providing reliable tech since 1992
                            </p>
                        </aside>

                        <nav>
                            <h6 className="footer-title">Services</h6>
                            <a className="link link-hover">Branding</a>
                            <a className="link link-hover">Design</a>
                            <a className="link link-hover">Marketing</a>
                            <a className="link link-hover">Advertisement</a>
                        </nav>
                        <nav>
                            <h6 className="footer-title">Company</h6>
                            <a className="link link-hover">About us</a>
                            <a className="link link-hover">Contact</a>
                            <a className="link link-hover">Jobs</a>
                            <a className="link link-hover">Press kit</a>
                        </nav>
                        <nav>
                            <h6 className="footer-title">Legal</h6>
                            <a className="link link-hover">Terms of use</a>
                            <a className="link link-hover">Privacy policy</a>
                            <a className="link link-hover">Cookie policy</a>
                        </nav>
                    </footer>
                    <aside className="flex justify-center text-center py-3 text-sm border-t text-primary ">
                        <p className="font-semibold">
                            Copyright © {new Date().getFullYear()} - All right
                            reserved by{" "}
                            <span className="text-red-500">
                                Lahiru Vimukthi
                            </span>
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
