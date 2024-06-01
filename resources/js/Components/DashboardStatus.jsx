import React from "react";

export default function DashboardStatus({ usedFeatures }) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Feature
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Credits
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Extra Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usedFeatures?.data?.length > 0 &&
                        usedFeatures?.data.map((usedFeature, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {usedFeature.feature.name}
                                </th>
                                <td className="px-6 py-4">
                                    {usedFeature.credits}
                                </td>
                                <td className="px-6 py-4">
                                    {usedFeature.feature.active == 1
                                        ? "Active"
                                        : "Expired"}
                                </td>
                                <td className="px-6 py-4">
                                    {usedFeature.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {JSON.stringify(usedFeature?.data)}
                                </td>
                            </tr>
                        ))}
                    {!usedFeatures && !usedFeatures?.data?.length && (
                        <tr>
                            <td colSpan={4} className="text-center p-8">
                                No Features Available Have Been Used
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
