import CreditPriceCards from "@/Components/CreditPriceCards";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, packages, features, success, error }) {
    const available_credits = auth.user.available_credits;
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Your Credits
                </h2>
            }
        >
            <Head title="Your Credits" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="rounded-lg bg-emerald-600 text-gray-100 p-3 mb-4">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="rounded-lg bg-red-600 text-gray-100 p-3 mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                        <div className="flex flex-col gap-3 items-center p-4">
                            <CircleStackIcon className="text-gray-200 size-6" />
                            <h3 className=" text-white text-2xl">
                                You Have {available_credits} credits.
                            </h3>
                        </div>
                    </div>
                    <CreditPriceCards
                        packages={packages.data}
                        features={features.data}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
