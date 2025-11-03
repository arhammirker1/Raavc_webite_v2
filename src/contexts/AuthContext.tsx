import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const getUsers = (): User[] => {
    try {
      const usersData = localStorage.getItem('users');
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };

  const saveUsers = (users: User[]): void => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length > 5;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Validate inputs
      if (!name.trim()) return false;
      if (!validateEmail(email)) return false;
      if (!validatePassword(password)) return false;

      const users = getUsers();
      
      // Check if email already exists
      if (users.find(u => u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: generateId(),
        name: name.trim(),
        email: email.toLowerCase(),
        password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
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
