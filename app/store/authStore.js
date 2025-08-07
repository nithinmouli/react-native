import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  initAuth: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        set({ isLoggedIn: true, user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    if (email === 'test@gmail.com' && password === '123') {
      const userData = { email };
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        set({ isLoggedIn: true, user: userData });
        return true;
      } catch (error) {
        console.error('Error saving auth state:', error);
        return false;
      }
    }
    return false;
  },
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('userData');
      set({ isLoggedIn: false, user: null });
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  },
  
  register: async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      set({ isLoggedIn: true, user: userData });
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  }
}));

export default useAuthStore;
