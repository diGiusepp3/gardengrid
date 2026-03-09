import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    // Mock Google Login
    setUser({ id: 'user-123', email: 'garden@example.com', name: 'Matthias' });
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white p-6 items-center justify-center">
      <View className="items-center mb-12">
        <View className="bg-primary-100 p-6 rounded-full mb-6">
          <Image 
            source={{ uri: 'https://picsum.photos/seed/garden/200/200' }} 
            className="w-24 h-24 rounded-full"
            referrerPolicy="no-referrer"
          />
        </View>
        <Text className="text-4xl font-bold text-slate-900 mb-2">GardenGrid</Text>
        <Text className="text-slate-500 text-center px-8">
          Design, manage, and grow your perfect vegetable garden.
        </Text>
      </View>

      <View className="w-full gap-4">
        <Button 
          label="Continue with Google" 
          onPress={handleLogin}
          className="bg-white border border-slate-200"
          labelClassName="text-slate-900"
        />
        <Button 
          label="Get Started" 
          onPress={() => router.push('/(auth)/login')}
          variant="primary"
        />
      </View>

      <Text className="absolute bottom-12 text-slate-400 text-xs">
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </View>
  );
}
