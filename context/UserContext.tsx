import React, { createContext, useContext, useState } from 'react';
import { getLocalStorageData, logoutClear, storeLocalStorageData } from '../services/axiosSetup/storage';
import { router } from 'expo-router';
import { userLogout } from '@/services/axiosFunctions/userAxios/userAxios';

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
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutUser = async () => {
    try {
      const user = await getLocalStorageData('user');
      if (!user) {
        console.warn("No user found in storage, skipping logout");
        await logoutClear();
        setUser(null);
        setIsAuthenticated(false);
        return router.replace('/login');
      }
  
      const response = await userLogout(user.email);
      console.log("User logout response:", response);
  
      await logoutClear();
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error:any) {
      console.error('Logout error:', error.message);
    }
  };
  

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated, 
      setIsAuthenticated,
      logoutUser 
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