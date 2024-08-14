'use client';

import { useState, useEffect } from 'react';

async function fetchVehicleTypes() {
    const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
    if (!response.ok) {
        throw new Error('Failed to fetch vehicle types');
    }
    const data = await response.json();
    return data.Results;
}

export default function VehicleTypeSelector({ onSubmit }) {
    const currentYear = new Date().getFullYear();

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');
    const [modelYear, setModelYear] = useState('');

    useEffect(() => {
        fetchVehicleTypes()
            .then((types) => {
                setVehicleTypes(types);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching vehicle types:', error);
                setLoading(false);
            });
    }, []);

    const isNextDisabled = !selectedType || !modelYear;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, selectedType, modelYear);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="vehicleType" className="block mb-2">
                    Vehicle Type
                </label>
                <select
                    id="vehicleType"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border rounded">
                    <option value="">Select type</option>
                    {vehicleTypes.map((type) => (
                        <option key={type.MakeId} value={type.MakeId}>
                            {type.MakeName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="modelYear" className="block mb-2">
                    Model Year
                </label>
                <select
                    id="modelYear"
                    value={modelYear}
                    onChange={(e) => setModelYear(e.target.value)}
                    className="w-full p-2 border rounded">
                    <option value="">Select year</option>
                    {Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i).map(
                        (year) => (
                            <option key={year} value={year.toString()}>
                                {year}
                            </option>
                        )
                    )}
                </select>
            </div>
            <button
                type="submit"
                disabled={isNextDisabled}
                className={`w-full p-2 rounded ${
                    isNextDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                Next
            </button>
        </form>
    );
}
