import React, { createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface AuthContextType {
    user: User | null;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
interface User {
    id: string;
    email: string;
    username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const login = async (email: string, password: string) => {
      try {
        setError(null);
        const response = await axios.post("http://localhost:3000/auth/login", { email, password });
        const { accessToken, user } = response.data;
  
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
  
        setUser(user);
        navigate("/mainpage");
      } catch (err: any) {
        setError(err.response?.data?.errors?.[0] || "Login failed");
      }
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return (
      <AuthContext.Provider value={{ user, error, login, logout }}>
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