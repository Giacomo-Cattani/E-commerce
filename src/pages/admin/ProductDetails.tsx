import React from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetailsProps {
  theme: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ theme }) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const themeClass =
    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <div className={`pt-32 ${themeClass}`}>
      <h1 className='text-2xl font-bold'>Product Details - {id}</h1>
      <div className='mt-4'>
        {/* Add product details editing functionality here */}
      </div>
    </div>
  );
};
