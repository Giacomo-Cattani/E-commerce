import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { account } from '../appwrite'

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, []);

    const login = async () => {
        try {
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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