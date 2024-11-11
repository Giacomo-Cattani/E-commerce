import React from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardProps {
    theme: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="mt-4">
                <span className="text-lg font-semibold">Key Metrics</span>
                {/* Add key metrics here */}
            </div>
            <Outlet />
        </div>
    );
};
