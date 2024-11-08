import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetails: React.FC = () => {
    const { id } = useParams<Record<string, string | undefined>>();

    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Product Details - {id}</h1>
            <div className="mt-4">
                {/* Add product details editing functionality here */}
            </div>
        </div>
    );
};