'use client';

import { useRouter } from 'next/navigation';
import VehicleTypeSelector from './VehicleTypeSelector';

export default function FilterPage() {
    const router = useRouter();
    const currentYear = new Date().getFullYear();

    const handleSubmit = (e, selectedType, modelYear) => {
        e.preventDefault();
        if (selectedType && modelYear) {
            router.push(`/result/${selectedType}/${modelYear}`);
        }
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Filter Vehicles</h1>
            <VehicleTypeSelector currentYear={currentYear} onSubmit={handleSubmit} />
        </div>
    );
}
