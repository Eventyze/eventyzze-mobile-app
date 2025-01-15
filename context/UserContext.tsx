import React, { createContext, useContext, useState } from 'react';
import { storeLocalStorageData } from '../services/axiosSetup/storage';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  role: string;
  isInitialProfileSetupDone?: boolean;
  // ... other user fields
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = async () => {
    try {
      await storeLocalStorageData('accessToken', '');
      await storeLocalStorageData('refreshToken', '');
      await storeLocalStorageData('user', '');
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated, 
      setIsAuthenticated,
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 