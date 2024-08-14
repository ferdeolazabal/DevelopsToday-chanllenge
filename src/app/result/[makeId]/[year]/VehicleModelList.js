import React, { use } from 'react';

async function generateStaticParams(makeId, year) {
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    if (!res.ok) {
        throw new Error('Failed to fetch vehicle models');
    }
    return res.json();
}

export default function VehicleModelList({ makeId, year }) {
    const data = use(generateStaticParams(makeId, year));
    const vehicleModels = data.Results;

    if (vehicleModels.length === 0) {
        return (
            <p className="p-4 text-gray-500">
                Sorry, we couldn't find any models for this manufacturer and year.
            </p>
        );
    }

    return (
        <ul className="divide-y divide-gray-200">
            {vehicleModels.map((model, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="text-sm font-medium text-indigo-600">{model.Model_Name}</div>
                    <div className="mt-1 text-sm text-gray-500">ID: {model.Model_ID}</div>
                </li>
            ))}
        </ul>
    );
}
