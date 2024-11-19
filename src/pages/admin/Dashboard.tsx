import React from 'react';
import { Outlet } from 'react-router-dom';
import { SalesMetrics, OrderManagement, InventoryManagement } from '../../components';

interface DashboardProps {
    theme: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme }) => {

    return (
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen`}>
            <SalesMetrics theme={theme} />
            <OrderManagement theme={theme} />
            <InventoryManagement theme={theme} />
            <Outlet />
        </div>
    );
};
