'use client';

import { useRouter } from 'next/navigation';
import VehicleTypeSelector from './VehicleTypeSelector';

export default function FilterPage() {
    const router = useRouter();

    const handleSubmit = (e, selectedType, modelYear) => {
        e.preventDefault();
        if (selectedType && modelYear) {
            router.push(`/result/${selectedType}/${modelYear}`);
        }
    };

    return (
        <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Filter Vehicles</h1>
            <VehicleTypeSelector onSubmit={handleSubmit} />
        </div>
    );
}
