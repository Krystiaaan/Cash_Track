import React, { createContext, useState, useEffect, useContext} from 'react';
import api from "../services/axiosConfig";

import { useNavigate } from 'react-router-dom';


interface AuthContextType {
    user: User | null;
    error: string | null;
    register: (userData: RegisterUserDTO) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
interface User {
    id: string;
    email: string;
    username: string;
}
interface RegisterUserDTO{
    email: string;
    username: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children})=> {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string |null>(null);
    const navigate = useNavigate();


    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const register = async (userData: RegisterUserDTO) => {
        try{
            setError(null);
            const response = await api.post('/auth/register', userData);
            const newUser = response.data;
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            navigate('/mainpage');

        }catch(err: any){
            setError(err.response?.data?.errors?.[0]||'Registration failed');
        }
    }
    const login = async(email:string, password: string)=>{
        try {
            setError(null);
            const response = await api.post('/auth/login', {email, password});
            const {accessToken, user} = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/mainpage');
        }catch(err: any){
            setError(err.response?.data?.errors?.[0] ||'Login failed');
        }
    }
    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };
    return(
        <AuthContext.Provider value ={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}