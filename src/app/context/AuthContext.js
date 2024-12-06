'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First, check if there's a token in the cookies
              const response = await fetch('http://localhost:8080/users/me', {
            method: 'GET',
            credentials: 'include', // Important for sending cookies
          });

        if (response.ok) {
          const userData = await response.json();
          console.log('Fetched User Data:', userData);
          setUser(userData);
          setError(null);
        } else {
          console.log('Failed to fetch user', response.status);
          setUser(null);
          setError('Failed to fetch user');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
        setError('Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        setError(null);
        router.push('/login');
      } else {
        console.error('Failed to log out');
        setError('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Logout error');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};