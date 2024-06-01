import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function Feature({ feature, answer, children }) {
    const { auth } = usePage().props;
    const availableCredits = auth.user.available_credits;
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {feature.name}
                </h2>
            }
        >
            <Head title="Feature-1" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {answer !== null && (
                        <div className=" mb-3 py-3 px-5 rounded text-white bg-emerald-600 text-xl">
                            Result of Calculation : {answer}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                        {availableCredits !== null &&
                            feature.required_credits > availableCredits && (
                                <div
                                    className={`absolute left-0 top-0 right-0 bottom-0 z-20 flex flex-col justify-center items-center
                            bg-white/70 gap-3`}
                                >
                                    <LockClosedIcon className="size-4 text-white" />
                                    <div>
                                        You Don't have enough credits for this
                                        feature. Go
                                        <Link
                                            className="underline"
                                            href={route("credit.index")}
                                        >
                                            Buy More Credits
                                        </Link>
                                    </div>
                                </div>
                            )}

                        <div className="p-8 text-gray-400 border-b pb-4">
                            <p>{feature.description}</p>
                            <p className="text-sm italic text-right">
                                Requires {feature.required_credits} credits.
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
