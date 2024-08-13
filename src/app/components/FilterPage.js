// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FilterPage = () => {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [modelYear, setModelYear] = useState('');
    const currentYear = new Date().getFullYear();
    const router = useRouter();

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const response = await fetch(
                    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
                );
                const data = await response.json();
                setVehicleTypes(data.Results);
            } catch (error) {
                console.error('Error fetching vehicle types:', error);
            }
        };

        fetchVehicleTypes();
    }, []);

    const handleNext = () => {
        const selectedMake = vehicleTypes.find((type) => type.MakeName === selectedType);
        if (selectedMake) {
            router.push(`/result/${selectedMake.MakeId}/${modelYear}`);
        }
    };

    const isNextDisabled = !selectedType || !modelYear;

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Filter Vehicles</h1>
            <form className="space-y-4">
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
                            <option key={type.MakeId} value={type.MakeName}>
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
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`w-full p-2 rounded ${
                        isNextDisabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    Next
                </button>
            </form>
        </div>
    );
};

export default FilterPage;
