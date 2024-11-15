import React from 'react';

interface ReportsProps {
    theme: string;
}

export const Reports: React.FC<ReportsProps> = ({ theme }) => {
    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <div className="mt-4">
                {/* Add reports and analytics functionality here */}
            </div>
        </div>
    );
};
