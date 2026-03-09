import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, Circle, Clock } from 'lucide-react-native';

export default function TasksScreen() {
  const { t } = useTranslation();

  const TaskItem = ({ title, subtitle, status }: any) => (
    <Card className="mb-3 flex-row items-center">
      <View className="mr-4">
        {status === 'completed' ? (
          <CheckCircle2 color="#16a34a" size={24} />
        ) : (
          <Circle color="#94a3b8" size={24} />
        )}
      </View>
      <View className="flex-1">
        <Text className={`font-bold ${status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
          {title}
        </Text>
        <Text className="text-slate-500 text-xs">{subtitle}</Text>
      </View>
      <Clock size={16} color="#94a3b8" />
    </Card>
  );

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <View className="mb-6">
        <Text className="text-lg font-bold text-slate-900 mb-4">Today</Text>
        <TaskItem title="Sow Tomatoes" subtitle="Greenhouse A • 09:00" status="pending" />
        <TaskItem title="Water Chickens" subtitle="Animal Zone • 08:00" status="completed" />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-slate-900 mb-4">Tomorrow</Text>
        <TaskItem title="Prune Apple Trees" subtitle="Fruit Zone • 10:00" status="pending" />
        <TaskItem title="Compost Turn" subtitle="Compost Zone • 14:00" status="pending" />
      </View>
    </ScrollView>
  );
}
