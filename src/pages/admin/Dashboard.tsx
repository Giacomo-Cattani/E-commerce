import React from 'react';
import { Outlet } from 'react-router-dom';
import { SalesMetrics, OrderManagement, InventoryManagement } from '../../components';

interface DashboardProps {
    theme: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <div className={`${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen`}>
            <SalesMetrics theme={theme} />
            <OrderManagement theme={theme} />
            <InventoryManagement theme={theme} />
            <Outlet />
        </div>
    );
};
