import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { loginAccount } from '../appwrite';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../context';
import { Models } from 'appwrite';

interface LoginProps {
    theme: string;
}

export const Login: React.FC<LoginProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';
    const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();


    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        loginAccount(email, password).then((res: string | (Models.Session | Models.TeamList<Models.Preferences>)[]) => {
            if (typeof res[0] !== 'object') {
                console.log(res);
                toast.error(String(res));
            } else {
                login(res[1] as Models.TeamList<Models.Preferences>);
                navigate('/');
            }
        }).catch((error) => {
            console.error('Error logging in:', error);
        });
    }

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}`}>
            <div className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                <h2 className="text-3xl font-bold mb-6 text-center text-neutral-800">Login</h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-800">Email</label>
                        <input required type="email" id="email" className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-neutral-800" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-800">Password</label>
                        <div className="relative">
                            <input required type={visibility ? 'text' : 'password'} id="password" className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-neutral-800" />
                            <button type="button" onClick={() => setVisibility(!visibility)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-800">
                                {visibility ? <EyeClosed size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition transform hover:scale-105">Login</button>
                </form>
                <p className="mt-6 text-center text-sm text-neutral-600 ">
                    Don't have an account? <a onClick={() => navigate('/signup')} className="text-yellow-500 hover:cursor-pointer">Sign up</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};