import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sprout, Plus, Calendar, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-slate-900">{t('welcome')}, Matthias!</Text>
        <Text className="text-slate-500">It's a great day to garden.</Text>
      </View>

      <View className="flex-row gap-4 mb-6">
        <Card className="flex-1 items-center justify-center py-6">
          <View className="bg-primary-100 p-3 rounded-full mb-2">
            <Sprout color="#16a34a" size={24} />
          </View>
          <Text className="text-2xl font-bold text-slate-900">3</Text>
          <Text className="text-slate-500 text-xs">{t('gardens')}</Text>
        </Card>
        <Card className="flex-1 items-center justify-center py-6">
          <View className="bg-blue-100 p-3 rounded-full mb-2">
            <Calendar color="#2563eb" size={24} />
          </View>
          <Text className="text-2xl font-bold text-slate-900">5</Text>
          <Text className="text-slate-500 text-xs">Active Tasks</Text>
        </Card>
      </View>

      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-slate-900">Upcoming Tasks</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/tasks')}>
            <Text className="text-primary-600 font-semibold">View All</Text>
          </TouchableOpacity>
        </View>
        
        <Card className="mb-3">
          <View className="flex-row items-center">
            <View className="w-2 h-10 bg-primary-500 rounded-full mr-4" />
            <View className="flex-1">
              <Text className="font-bold text-slate-900">Sow Tomatoes</Text>
              <Text className="text-slate-500 text-xs">Greenhouse A • Today</Text>
            </View>
            <ArrowRight size={20} color="#94a3b8" />
          </View>
        </Card>

        <Card>
          <View className="flex-row items-center">
            <View className="w-2 h-10 bg-blue-500 rounded-full mr-4" />
            <View className="flex-1">
              <Text className="font-bold text-slate-900">Water Chickens</Text>
              <Text className="text-slate-500 text-xs">Animal Zone • Today</Text>
            </View>
            <ArrowRight size={20} color="#94a3b8" />
          </View>
        </Card>
      </View>

      <Button 
        label={t('addGarden')} 
        onPress={() => router.push('/gardens/create')}
        className="mb-8"
      />
    </ScrollView>
  );
}
