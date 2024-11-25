import { useNavigate } from "react-router-dom";
import { createAccount } from '../appwrite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState } from 'react';

interface SignUpProps {
    theme: string;
}

export const SignUp: React.FC<SignUpProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';
    const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();



    function SignUpHandling(e: React.FormEvent) {
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        if (password.length < 8 || password.length > 265) {
            toast.error('Password must be between 8 and 265 characters.');
            return;
        }
        createAccount(email, password, name)
            .then((res) => {
                if ((res as { status: boolean }).status === true) {
                    navigate('/login');

                    toast.success('Account created successfully');
                } else {
                    toast.error((res as { message: string }).message);
                }
            })
            .catch((error) => {
                console.error('Error creating account:', error);
                toast.error(error.message);
            });
    }

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}`}>
            <div className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                <h2 className="text-3xl font-bold mb-6 text-center text-neutral-800">Sign Up</h2>
                <form onSubmit={SignUpHandling} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-800">Name</label>
                        <input required type="text" id="name" className={`text-neutral-800 mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 `} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-800">Email</label>
                        <input required type="email" id="email" className={`text-neutral-800 mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 `} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-800">Password</label>
                        <div className="relative">
                            <input required type={visibility ? 'text' : 'password'} id="password" className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-neutral-800" />
                            <button type="button" onClick={() => setVisibility(!visibility)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-800">
                                {visibility ? <IconEyeClosed size={20} /> : <IconEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition transform hover:scale-105">Sign Up</button>
                </form>
                <p className={`mt-6 text-center text-sm text-neutral-600 ${isDarkTheme ? 'text-neutral-400' : ''}`}>
                    Already have an account? <a onClick={() => navigate('/login')} className="text-yellow-500 hover:cursor-pointer">Login</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};
