import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { LogOut, Globe, Bell, Shield, User } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const logout = useAuthStore((state) => state.logout);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'nl' : 'en';
    i18n.changeLanguage(nextLng);
  };

  const SettingItem = ({ icon: Icon, label, value, onPress, danger }: any) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-slate-100"
    >
      <View className={`p-2 rounded-lg mr-4 ${danger ? 'bg-red-50' : 'bg-slate-50'}`}>
        <Icon size={20} color={danger ? '#ef4444' : '#64748b'} />
      </View>
      <Text className={`flex-1 font-medium ${danger ? 'text-red-600' : 'text-slate-700'}`}>
        {label}
      </Text>
      {value && <Text className="text-slate-400 text-sm">{value}</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <Card className="mb-6">
        <SettingItem icon={User} label={t('profile')} />
        <SettingItem 
          icon={Globe} 
          label="Language" 
          value={i18n.language === 'en' ? 'English' : 'Dutch'} 
          onPress={toggleLanguage}
        />
        <SettingItem icon={Bell} label="Notifications" value="On" />
        <SettingItem icon={Shield} label="Privacy & Security" />
      </Card>

      <Card>
        <SettingItem 
          icon={LogOut} 
          label="Logout" 
          onPress={logout}
          danger
        />
      </Card>

      <View className="mt-8 items-center">
        <Text className="text-slate-400 text-xs">GardenGrid v1.0.0</Text>
      </View>
    </ScrollView>
  );
}
