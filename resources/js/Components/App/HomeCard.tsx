import React from "react";
import MoneyIcon from "../icons/MoneyIcon";
import { FaPlusCircle, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "../Core/ApplicationLogo";

export default function HomeCard() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Card 1 */}
            <div className="card w-full sm:w-1/2 shadow-lg p-5">
                <div className="card-content flex flex-col sm:flex-row items-center gap-4">
                    <MoneyIcon />
                    <div className="flex flex-col gap-3 p-2 sm:p-4 w-full">
                        <h1 className="text-lg font-bold">
                            Start making money!
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Do you have something to sell? Post your first ad
                            and start making money!
                        </p>
                        <Link
                            as="button"
                            href="#"
                            className="btn rounded-full btn-warning text-sm font-bold w-full sm:w-[200px]"
                        >
                            <FaPlusCircle className="h-5 w-5" />
                            Post your ad for free
                        </Link>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="card w-full sm:w-1/2 shadow-lg p-5">
                <div className="card-content flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-bold flex gap-2 items-center">
                        <ApplicationLogo />
                        <div>
                            Sell
                            <span className="text-blue-700">It</span>Jobs
                        </div>
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Looking to hire or get hired in Sri Lanka? Get access to
                        400k+ CVs or browse through 4.5k+ job vacancies!
                    </p>
                    <Link
                        as="button"
                        href="#"
                        className="btn rounded-full btn-success text-sm font-bold w-full sm:w-[200px]"
                    >
                        Explore more <FaArrowAltCircleRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
