import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-6">
      <Stack.Screen options={{ headerShown: false }} />
      
      <TouchableOpacity onPress={() => router.back()} className="mb-8 mt-4">
        <ArrowLeft color="#111827" size={24} />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</Text>
      <Text className="text-slate-500 mb-8">Login to manage your gardens.</Text>

      <View className="gap-4 mb-8">
        <View>
          <Text className="text-sm font-bold text-slate-700 mb-2">Email</Text>
          <TextInput 
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text className="text-sm font-bold text-slate-700 mb-2">Password</Text>
          <TextInput 
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
      </View>

      <Button label="Login" onPress={() => router.replace('/(tabs)')} />
      
      <View className="flex-row justify-center mt-6">
        <Text className="text-slate-500">Don't have an account? </Text>
        <TouchableOpacity>
          <Text className="text-primary-600 font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
