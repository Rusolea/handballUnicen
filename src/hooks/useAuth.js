import { createContext, useContext } from 'react';

// 1. Creamos el contexto aquí
export const AuthContext = createContext(null);

// 2. Creamos y exportamos el hook personalizado para usar el contexto
export const useAuth = () => {
  // Ya no lanzamos un error. Simplemente devolvemos el contexto.
  // Si no hay Provider, el valor devuelto será 'null' (el valor por defecto de createContext).
  return useContext(AuthContext);
}; 