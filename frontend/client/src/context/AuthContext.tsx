'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface User { id: number; email: string }
interface AuthContextData {
    user: User | null;
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get<User>('/users/me')
                .then(res => setUser(res.data))
                .catch(() => logout());
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        const profile = await api.get<User>('/users/me');
        setUser(profile.data);
        router.push('/tasks');
    };

    const register = async (email: string, password: string) => {
        await api.post('/auth/register', { email, password });
        await login(email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common.Authorization;
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
