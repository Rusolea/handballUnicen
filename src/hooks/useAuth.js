import { createContext, useContext } from 'react';

// 1. Create the context here
export const AuthContext = createContext(null);

// 2. Create and export the custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) { // Check against undefined is more robust
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 