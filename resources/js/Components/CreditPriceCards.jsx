import { usePage } from "@inertiajs/react";
import React from "react";

export default function CreditPriceCards({ packages, features }) {
    const auth = usePage().props.auth;

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        The More Credits You Choose, The Bigger Savings You Will
                        Make
                    </h2>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {/* <!-- Pricing Card --> */}
                    {packages?.length > 0 &&
                        packages?.map((pkg, index) => (
                            <div
                                key={index}
                                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                            >
                                <h3 className="mb-4 text-2xl font-semibold">
                                    {pkg.name}
                                </h3>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">
                                        £{pkg.price}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        /{pkg.credits} credits
                                    </span>
                                </div>
                                {/* <!-- List --> */}
                                <ul
                                    role="list"
                                    className="mb-8 space-y-4 text-left"
                                >
                                    {features?.length > 0 &&
                                        features?.map((feature, key) => (
                                            <li
                                                className="flex items-center space-x-3"
                                                key={key}
                                            >
                                                {/* <!-- Icon --> */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>{feature.name}</span>
                                            </li>
                                        ))}
                                </ul>
                                <form
                                    action={route("credit.buy", pkg)}
                                    method="post"
                                    className="w-full"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={auth.csrf_token}
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    >
                                        Choose plan
                                    </button>
                                </form>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
