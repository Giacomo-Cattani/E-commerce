import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { account, teams } from '../appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
    isLoggedIn: boolean;
    loading: boolean; // Add loading state
    login: (list: Models.TeamList<Models.Preferences>) => Promise<void>;
    logout: () => void;
    admin: boolean;
    categories: { name: string; icon: string }[];
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

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                const list = await teams.list();
                try {
                    if (list.teams[0]!.name === 'Admin') {
                        setAdmin(true);
                        console.log('Admin');
                    }
                } catch (error) {
                    setAdmin(false);
                    console.log('Not Admin');
                }
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
            if (list.teams[0]!.name === 'Admin') {
                setAdmin(true);
                console.log('Admin');
            }
        } catch (error) {
            setAdmin(false);
            console.log('Not Admin');
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

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, admin, categories }}>
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