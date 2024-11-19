
import React from 'react';
import { Products as AdminProducts } from './admin/Products';

export const Products: React.FC<{ theme: string }> = ({ theme }) => {
    return <AdminProducts theme={theme} />;
};