import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { taskRepository } from '@/db/repositories';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Calendar, Type } from 'lucide-react-native';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
  reminderAt: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateTaskScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user) || { id: 'default-user', email: '', name: '' };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      type: 'general',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      reminderAt: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => taskRepository.createTask({
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      title: data.title,
      type: data.type,
      date: data.date,
      status: 'pending',
      notes: data.notes,
      reminderAt: data.reminderAt,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.back();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: t('createTask'), headerShown: true }} />
      
      <View className="mb-6">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('taskTitle')}</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
              placeholder="e.g. Water the tomatoes"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text className="text-red-500 text-xs mt-1">{errors.title.message}</Text>}
      </View>

      <View className="mb-6">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('taskType')}</Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2">
              {['general', 'sowing', 'watering', 'harvesting', 'maintenance'].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => onChange(type)}
                  className={`px-4 py-2 rounded-full border ${
                    value === type ? 'bg-primary-50 border-primary-600' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text className={value === type ? 'text-primary-700 font-bold' : 'text-slate-600'}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('date')}</Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl p-4">
              <Calendar size={20} color="#64748b" className="mr-2" />
              <TextInput
                className="flex-1 text-slate-900"
                placeholder="YYYY-MM-DD"
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.date && <Text className="text-red-500 text-xs mt-1">{errors.date.message}</Text>}
      </View>

      <View className="mb-6">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('reminder')} (Optional)</Text>
        <Controller
          control={control}
          name="reminderAt"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl p-4">
              <Bell size={20} color="#64748b" className="mr-2" />
              <TextInput
                className="flex-1 text-slate-900"
                placeholder="YYYY-MM-DD HH:mm"
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        <Text className="text-slate-500 text-xs mt-1">Format: YYYY-MM-DD HH:mm (e.g. 2026-03-09 09:00)</Text>
      </View>

      <View className="mb-8">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('notes')}</Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 h-32"
              placeholder="Any additional details..."
              multiline
              textAlignVertical="top"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <Button 
        label={t('saveTask')} 
        onPress={handleSubmit(onSubmit)}
        loading={mutation.isPending}
      />
    </ScrollView>
  );
}
