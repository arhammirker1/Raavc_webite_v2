import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuNe5ZAuHPuSQ162mkEh_p8yqIoytz9GvbcIDw4fvOckQPjp0BO8c5LXSFdRUSPPY/exec";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'text/plain;charset=utf-8'  // CHANGED: Use text/plain to avoid OPTIONS preflight
        },
        body: JSON.stringify({ action: 'login', email, password }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        const userData = data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'text/plain;charset=utf-8'  // CHANGED: Use text/plain to avoid OPTIONS preflight
        },
        body: JSON.stringify({ action: 'register', name, email, password }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        const userData = data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (err) {
      console.error('Register error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};