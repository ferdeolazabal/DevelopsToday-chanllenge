import React, { Suspense } from 'react';
import Link from 'next/link';
import VehicleModelList from './VehicleModelList';

async function generateStaticParams(makeId, year) {
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    if (!res.ok) {
        throw new Error('Failed to fetch vehicle models');
    }
    return res.json();
}

export default async function ResultPage({ params }) {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">
                            Search Results
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Vehicle models for make ID {params.makeId} and year {params.year}
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <Suspense fallback={<LoadingSpinner />}>
                            <VehicleModelList makeId={params.makeId} year={params.year} />
                        </Suspense>
                    </div>
                </div>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Back to Search
                    </Link>
                </div>
            </div>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );
}
