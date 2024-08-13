import React from 'react';
import FilterPage from './components/FilterPage';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <FilterPage />
        </main>
    );
}
