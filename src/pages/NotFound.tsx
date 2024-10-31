import { useNavigate } from "react-router-dom";

interface NotFoundProps {
    theme: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ theme }) => {
    const navigate = useNavigate();
    const isDarkMode = theme === 'dark';

    return (
        <div className={`flex items-center justify-center h-screen `}>
            <div className="text-center">
                <h1 className={`text-6xl font-bold ${isDarkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>404</h1>
                <p className={`text-2xl mt-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Page Not Found</p>
                <button onClick={() => navigate('/')} className="mt-6 inline-block px-4 py-2 bg-yellow-500 text-neutral-900 rounded hover:bg-yellow-600">
                    Go to Home
                </button>
            </div>
        </div>
    );
}