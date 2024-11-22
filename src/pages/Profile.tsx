import React, { useEffect, useState } from 'react';
import { useAuth } from '../context';
import { ToastContainer, toast } from 'react-toastify';
import { IconPencil } from '@tabler/icons-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // Assume you have a utility function to crop the image
import { account } from '../appwrite';

export const Profile: React.FC<{ theme: string }> = ({ theme }) => {
    const { user, updateEmail, imageSrc, updateImg, fetchProfileData } = useAuth();
    const isDarkTheme = theme === 'dark';
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<CropArea | null>(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

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

    interface CropArea {
        width: number;
        height: number;
        x: number;
        y: number;
    }

    const onCropComplete = (_croppedAreaPercentage: CropArea, croppedAreaPixels: CropArea) => {
        setCroppedArea(croppedAreaPixels);
    };

    interface ImageUploadEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleImageUpload = async (e: ImageUploadEvent) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = () => {
                updateImg(reader.result as string);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Please upload a valid image file (jpg or png).');
        }
    };

    const handleCropSave = async () => {
        if (croppedArea) {
            const croppedImage = await getCroppedImg(imageSrc, croppedArea);
            await account.updatePrefs({ avatar: croppedImage });
            setShowCropper(false);
        } else {
            toast.error('Failed to crop the image.');
        }
    };

    return (
        <div className={`${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen`}>
            <section className="py-24 px-6">
                <div className="container max-w-sm mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-12">Profile Page</h1>
                    <div className={`rounded-xl shadow-md p-6 ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h2 className="text-2xl text-center font-semibold mb-4">Welcome, {user.name}</h2>
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img src={imageSrc} alt="Profile" className="items-centers w-32 h-32 rounded-full mb-4" />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="profile-image-upload"
                                />
                                <label htmlFor="profile-image-upload" className="absolute top-0 left-0 px-2 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition cursor-pointer">
                                    <IconPencil />
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="font-bold mr-2 text-lg">Email:</p>
                            <span>{user.email}</span>
                            <div className="ml-auto">
                                <button
                                    onClick={() => setShowPopup(true)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="font-bold mr-2 text-lg">Member since: </p>
                            <span>{new Date(user.$createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="font-bold mr-2 text-lg">Phone: </p>
                            <span>{user.phone}</span>
                        </div>
                    </div>
                </div>
            </section >
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
            {showCropper && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-xl shadow-md h-2/3 w-11/12 max-w-lg ${isDarkTheme ? 'bg-neutral-700 text-white' : 'bg-white'}`}>
                        <h3 className="text-xl font-semibold mb-4">Crop Image</h3>
                        <div className="relative w-full h-3/4">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape='round'
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowCropper(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCropSave}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div >
    );
};