import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading] = useState(false);

  useEffect(() => {
    // Sync token state if it changes elsewhere (e.g., logout in another tab)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      const newUser = localStorage.getItem('user');
      setToken(newToken);
      setUser(newUser ? JSON.parse(newUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loginUser = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
