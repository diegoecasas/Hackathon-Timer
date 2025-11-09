import { useState, useCallback, useEffect } from 'react';
import { User } from '../types';

const USERS_STORAGE_KEY = 'innovacion_users';
const CURRENT_USER_STORAGE_KEY = 'innovacion_current_user';

// Helper to get users from localStorage
const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Failed to load users from local storage", error);
    return [];
  }
};

// Helper to get current user from localStorage
const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to load current user from local storage", error);
    return null;
  }
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());

  const signup = useCallback((email: string, password: string): { success: boolean, message: string } => {
    const users = getUsers();
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
      return { success: false, message: 'Ya existe un usuario con este correo electrónico.' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password, // En una aplicación real, esto debería ser un hash
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    // Log in the new user immediately
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);

    return { success: true, message: '¡Registro exitoso!' };
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean, message: string } => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, message: '¡Inicio de sesión exitoso!' };
    } else {
      return { success: false, message: 'Correo electrónico o contraseña incorrectos.' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
  }, []);

  return { currentUser, signup, login, logout };
};
