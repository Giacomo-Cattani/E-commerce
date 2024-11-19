import React, { useState } from 'react';
import { useAuth } from '../context';
import { ToastContainer, toast } from 'react-toastify';

export const Profile: React.FC<{ theme: string }> = ({ theme }) => {
    const { user, updateEmail } = useAuth();
    const isDarkTheme = theme === 'dark';
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleEmailChange = async () => {

        try {
            await updateEmail(newEmail, password);
            toast.success('Email updated successfully!');
            setNewEmail('');
            setPassword('');
            setShowPopup(false);
        } catch (error) {
            toast.error('Failed to update email.');
        }
    };

    return (
        <div className={`${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen`}>
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-12">Profile Page</h1>
                    <div className={`rounded-xl shadow-md p-6 ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h2>
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Email: {user.email}</p>
                            <button
                                onClick={() => setShowPopup(true)}
                                className="px-2 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                            >
                                Update
                            </button>
                        </div>
                        <p className="mb-4">Member since: {new Date(user.$createdAt).toLocaleDateString()}</p>
                        <p className="mb-4">Phone: {user.phone}</p>
                    </div>
                </div>
            </section>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-xl shadow-md ${isDarkTheme ? 'bg-neutral-700 text-white' : 'bg-white'}`}>
                        <h3 className="text-xl font-semibold mb-4">Update Email</h3>
                        <label className="block mb-2">New Email:</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full p-2 border rounded mb-4 text-neutral-900"
                        />
                        <label className="block mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded mb-4 text-neutral-900"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEmailChange}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};