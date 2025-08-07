import { Stack } from 'expo-router';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

export default function RootLayout() {
  const { isLoggedIn, isLoading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);
  if (isLoading) {
    return null; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </>
      )}
    </Stack>
  );
}
