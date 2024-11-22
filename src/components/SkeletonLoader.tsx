import { useState, useEffect } from 'react';

export const SkeletonLoader = () => {
    const [layout, setLayout] = useState(1);

    const getRandomWidth = () => {
        const widths = ['w-1/4', 'w-1/3', 'w-1/2', 'w-2/3', 'w-3/4', 'w-full'];
        return widths[Math.floor(Math.random() * widths.length)];
    };

    const getRandomHeight = () => {
        const heights = ['h-4', 'h-6', 'h-8', 'h-10', 'h-12'];
        return heights[Math.floor(Math.random() * heights.length)];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLayout(prev => (prev % 8) + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const Layout1 = () => (
        <div className="space-y-4">
            <div className={`${getRandomWidth()} h-8 bg-gray-600 rounded animate-pulse`} />
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout2 = () => (
        <div className="space-y-4">
            <div className="h-12 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout3 = () => (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-600 rounded animate-pulse" />
                <div className="flex-1 space-y-3">
                    <div className={`${getRandomWidth()} h-6 bg-gray-600 rounded animate-pulse`} />
                    <div className={`${getRandomWidth()} h-4 bg-gray-600 rounded animate-pulse`} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout4 = () => (
        <div className="space-y-4">
            <div className="h-16 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout5 = () => (
        <div className="space-y-4">
            <div className="h-20 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout6 = () => (
        <div className="space-y-4">
            <div className="h-24 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout7 = () => (
        <div className="space-y-4">
            <div className="h-28 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-56 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    const Layout8 = () => (
        <div className="space-y-4">
            <div className="h-32 bg-gray-600 rounded animate-pulse" />
            <div className="grid grid-cols-7 gap-4">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-600 rounded animate-pulse" />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`${getRandomWidth()} ${getRandomHeight()} bg-gray-600 rounded animate-pulse`} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="py-24 mx-auto p-4 overflow-hidden h-screen">
            {layout === 1 && <Layout1 />}
            {layout === 2 && <Layout2 />}
            {layout === 3 && <Layout3 />}
            {layout === 4 && <Layout4 />}
            {layout === 5 && <Layout5 />}
            {layout === 6 && <Layout6 />}
            {layout === 7 && <Layout7 />}
            {layout === 8 && <Layout8 />}
        </div>
    );
};