import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { account, storage, teams } from '../appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
    isLoggedIn: boolean;
    loading: boolean; // Add loading state
    login: (list: Models.TeamList<Models.Preferences>) => Promise<void>;
    logout: () => void;
    updateEmail: (newEmail: string, password: string) => Promise<void>;
    admin: boolean;
    categories: { name: string; icon: string }[];
    user: Models.User<Models.Preferences>;
    fetchProfileData: () => void;
    imageSrc: string;
    updateImg: (value: string) => void;
    setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [admin, setAdmin] = useState<boolean>(false);
    const categories = [
        { name: 'Electronics', icon: '💻' },
        { name: 'Fashion', icon: '👗' },
        { name: 'Home & Kitchen', icon: '🏠' },
        { name: 'Sports', icon: '⚽' },
        { name: 'Beauty', icon: '💄' },
        { name: 'Books', icon: '📚' }
    ];
    const [user, setUser] = useState<Models.User<Models.Preferences>>({} as Models.User<Models.Preferences>);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await account.get();
                const list = await teams.list();
                try {
                    if (list.teams[0]!.name === 'Admin') {
                        setAdmin(true);
                    }
                } catch (error) {
                    setAdmin(false);
                }
                setUser(user);
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setLoading(false); // Set loading to false after check
            }
        };
        checkSession();
    }, []);

    const login = async (list: Models.TeamList<Models.Preferences>) => {
        try {
            setUser(await account.get());
            if (list.teams[0]!.name === 'Admin') {
                setAdmin(true);
            }
        } catch (error) {
            setAdmin(false);
        }
        setLoading(true); // Set loading to true after logout
        try {
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoading(false); // Set loading to false after logout
        }
    };

    const logout = async () => {
        setLoading(true); // Set loading to true after logout
        try {
            await account.deleteSession('current');
            setAdmin(false);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setLoading(false); // Set loading to false after logout
        }
    };

    const updateEmail = async (newEmail: string, password: string) => {
        await account.updateEmail(newEmail, password);
        setUser(await account.get());
    };

    const fetchProfileData = async () => {
        try {
            const prefs = await account.getPrefs();

            if (prefs.avatar) {
                const imageResponse = await fetch(
                    storage.getFileView(
                        import.meta.env.VITE_STORAGE_IMG,
                        prefs.avatar
                    )
                );
                if (imageResponse.status === 200) {
                    const image = await imageResponse.blob();
                    setImageSrc(URL.createObjectURL(image));
                } else {
                    setImageSrc(prefs.avatar);
                }
            } else {
                const defaultImage = 'https://api.dicebear.com/9.x/identicon/svg?seed=' + user.email + '&scale=70&backgroundColor=ffdfbf';
                setImageSrc(defaultImage);
                prefs.avatar = defaultImage;
                // Remove empty keys from prefs
                Object.keys(prefs).forEach(key => {
                    if (key === "" && prefs[key] === "") {
                        delete prefs[key];
                    }
                });
                await account.updatePrefs({ ...prefs });
            }
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
    };

    const updateImg = (value: string) => {
        setImageSrc(value);
    }

    return (
        <AuthContext.Provider value={{ fetchProfileData, imageSrc, updateImg, isLoggedIn, loading, login, logout, admin, categories, user, updateEmail, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};