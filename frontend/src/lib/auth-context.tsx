'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '../types/index';
import { executeGraphQL } from './graphql-client';
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from './graphql-queries';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: any) => Promise<void>;
  demoLogin: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('foodrescue_token');
    const savedUser = localStorage.getItem('foodrescue_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('foodrescue_token');
        localStorage.removeItem('foodrescue_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await executeGraphQL<{ login: { accessToken: string; user: User } }>(
        LOGIN_MUTATION,
        { input: { email, password } }
      );

      if (data?.login) {
        const { accessToken, user: loggedInUser } = data.login;
        setToken(accessToken);
        setUser(loggedInUser);
        localStorage.setItem('foodrescue_token', accessToken);
        localStorage.setItem('foodrescue_user', JSON.stringify(loggedInUser));

        // Redirect based on role
        redirectUserByRole(loggedInUser.role);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (input: any) => {
    setIsLoading(true);
    try {
      const data = await executeGraphQL<{ register: { accessToken: string; user: User } }>(
        REGISTER_MUTATION,
        { input }
      );

      if (data?.register) {
        const { accessToken, user: registeredUser } = data.register;
        setToken(accessToken);
        setUser(registeredUser);
        localStorage.setItem('foodrescue_token', accessToken);
        localStorage.setItem('foodrescue_user', JSON.stringify(registeredUser));

        redirectUserByRole(registeredUser.role);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (role: UserRole) => {
    if (role === 'DONOR') {
      await login('donor@foodrescue.org', 'password123');
    } else if (role === 'VOLUNTEER') {
      await login('volunteer@foodrescue.org', 'password123');
    } else {
      await login('receiver@foodrescue.org', 'password123');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('foodrescue_token');
    localStorage.removeItem('foodrescue_user');
    router.push('/login');
  };

  const redirectUserByRole = (role: UserRole) => {
    if (role === 'DONOR') router.push('/donor/dashboard');
    else if (role === 'VOLUNTEER') router.push('/volunteer/dashboard');
    else if (role === 'RECEIVER') router.push('/receiver/dashboard');
    else router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
