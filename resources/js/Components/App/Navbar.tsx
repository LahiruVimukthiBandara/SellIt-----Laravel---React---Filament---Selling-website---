import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ApplicationLogo from "../Core/ApplicationLogo";

export default function Navbar() {
    const user = usePage().props.auth.user as any;

    return (
        <div className="z-50 drawer">
            {/* Drawer toggle */}
            <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="px-4 shadow-sm navbar bg-base-100">
                    <div className="flex items-center justify-between w-full">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 text-xl font-extrabold"
                        >
                            <ApplicationLogo />
                            <h1 className="text-2xl font-bold">
                                Sell<span className="text-primary">It</span>
                            </h1>
                        </Link>

                        {/* Mobile Hamburger */}
                        <label
                            htmlFor="nav-drawer"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>

                    {/* Desktop only: search + auth links */}
                    <div className="items-center hidden gap-3 lg:flex ">
                        <div className="px-10">
                            <ul className="flex items-center gap-3 text-sm">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                                <li>
                                    <Link href="/adds">Ads</Link>
                                </li>
                            </ul>
                        </div>
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center justify-start gap-2 mb-5"
                                >
                                    <div className="flex items-center pt-4 avatar">
                                        <div className="w-8 rounded-full">
                                            <img
                                                alt="User avatar"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            />
                                        </div>
                                    </div>
                                    <span className="pt-6 text-sm font-medium">
                                        {user?.first_name}
                                    </span>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="z-10 p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <Link href="/createAd">
                                            Free Ad
                                            <span className="badge"> new</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("profile.edit")}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <Link
                                    as="button"
                                    href={route("login")}
                                    className="btn btn-primary"
                                >
                                    Login
                                </Link>
                                <Link
                                    as="button"
                                    href={route("register")}
                                    className="btn"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer Sidebar Content (Mobile Only) */}
            <div className="z-50 drawer-side">
                <label htmlFor="nav-drawer" className="drawer-overlay"></label>
                <ul className="w-64 min-h-full p-4 py-10 space-y-2 menu bg-base-100 text-base-content">
                    {user ? (
                        <>
                            <li>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center justify-start gap-2 mb-5 btn btn-ghost btn-sm"
                                >
                                    <div className="avatar">
                                        <div className="w-8 rounded-full">
                                            <img
                                                alt="User avatar"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">
                                        {user?.first_name}
                                    </span>
                                </div>
                            </li>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/adds">Ads</Link>
                            </li>
                            <li>
                                <Link href="/createAd">
                                    Free Ad
                                    <span className="badge"> new</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={route("logout")} method="post">
                                    Logout
                                </Link>
                            </li>
                            <li className="pt-10">
                                <p>
                                    Welcome to Sell
                                    <span className="text-lg text-primary">
                                        It
                                    </span>
                                </p>
                                <p>
                                    your go-to platform for buying and selling
                                    anything, anywhere in Sri Lanka. Whether
                                    you're looking for property, vehicles,
                                    electronics, or services, we've made it easy
                                    to browse and post ads right from your
                                    mobile or tablet. Start exploring today!
                                </p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    as="button"
                                    href={route("login")}
                                    className="w-full btn btn-primary"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    as="button"
                                    href={route("register")}
                                    className="w-full btn"
                                >
                                    Register
                                </Link>
                            </li>
                            <li className="pt-10">
                                <p>
                                    Welcome to Sell
                                    <span className="text-lg text-primary">
                                        It
                                    </span>
                                </p>
                                <p>
                                    your go-to platform for buying and selling
                                    anything, anywhere in Sri Lanka. Whether
                                    you're looking for property, vehicles,
                                    electronics, or services, we've made it easy
                                    to browse and post ads right from your
                                    mobile or tablet. Start exploring today!
                                </p>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
