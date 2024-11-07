import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartPopUpProps {
    items: { id: number; name: string; price: number; quantity: number }[];
    onClose: () => void;
}

export const CartPopUp: React.FC<CartPopUpProps> = ({ items, onClose }) => {
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const popupRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="relative">
            <div ref={popupRef} className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <ul className="divide-y divide-gray-200 mb-2">
                    {items.map((item) => (
                        <li key={item.id} className="py-1 flex justify-between items-center">
                            <span>{item.name}</span>
                            <span>
                                {item.quantity} x ${item.price.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center font-bold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button onClick={() => { onClose(), navigate('/checkout') }} className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
                    Checkout
                </button>
            </div>
        </div>
    );
};