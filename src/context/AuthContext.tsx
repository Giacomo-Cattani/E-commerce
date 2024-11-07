import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { account } from '../appwrite'

interface AuthContextType {
    isLoggedIn: boolean;
    loading: boolean; // Add loading state
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setLoading(false); // Set loading to false after check
            }
        };
        checkSession();
    }, []);

    const login = async () => {

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
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setLoading(false); // Set loading to false after logout
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
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