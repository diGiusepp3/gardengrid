import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { gardenRepository } from '@/db/repositories';
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronRight, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function GardensScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((state) => state.user) || { id: 'default-user' };

  const { data: gardens, isLoading } = useQuery({
    queryKey: ['gardens', user.id],
    queryFn: () => gardenRepository.getGardens(user.id),
  });

  const renderGardenItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => router.push(`/gardens/${item.id}`)}>
      <Card className="mb-4 flex-row items-center">
        <View className="bg-primary-100 p-4 rounded-2xl mr-4">
          <MapPin color="#16a34a" size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-900">{item.name}</Text>
          <Text className="text-slate-500">
            {item.width} x {item.height} {item.unit}
          </Text>
        </View>
        <ChevronRight color="#94a3b8" size={20} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-50 p-4">
      <FlatList
        data={gardens}
        renderItem={renderGardenItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          !isLoading ? (
            <View className="items-center justify-center py-20">
              <Text className="text-slate-400 text-center mb-6">{t('noGardens')}</Text>
              <Button 
                label={t('addGarden')} 
                onPress={() => router.push('/gardens/create')}
              />
            </View>
          ) : null
        }
      />
      
      {gardens && gardens.length > 0 && (
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-primary-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => router.push('/gardens/create')}
        >
          <Plus color="#fff" size={32} />
        </TouchableOpacity>
      )}
    </View>
  );
}
