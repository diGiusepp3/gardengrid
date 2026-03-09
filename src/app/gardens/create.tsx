import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { gardenRepository } from '@/db/repositories';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  width: z.string().min(1, 'Width is required'),
  height: z.string().min(1, 'Height is required'),
  unit: z.enum(['meters', 'feet', 'centimeters']),
});

type FormData = {
  name: string;
  width: string;
  height: string;
  unit: 'meters' | 'feet' | 'centimeters';
};

export default function CreateGardenScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user) || { id: 'default-user', email: '', name: '' };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      width: '10',
      height: '10',
      unit: 'meters',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => gardenRepository.createGarden({
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      name: data.name,
      width: parseFloat(data.width),
      height: parseFloat(data.height),
      unit: data.unit,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gardens'] });
      router.back();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: t('createGarden'), headerShown: true }} />
      
      <View className="mb-6">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('gardenName')}</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
              placeholder="e.g. Backyard Paradise"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name.message}</Text>}
      </View>

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1">
          <Text className="text-sm font-bold text-slate-700 mb-2">{t('width')}</Text>
          <Controller
            control={control}
            name="width"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.width && <Text className="text-red-500 text-xs mt-1">{errors.width.message}</Text>}
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-slate-700 mb-2">{t('height')}</Text>
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.height && <Text className="text-red-500 text-xs mt-1">{errors.height.message}</Text>}
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-sm font-bold text-slate-700 mb-2">{t('unit')}</Text>
        <View className="flex-row gap-2">
          {(['meters', 'feet', 'centimeters'] as const).map((u) => (
            <Controller
              key={u}
              control={control}
              name="unit"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  onPress={() => onChange(u)}
                  className={`flex-1 py-3 rounded-xl border items-center ${
                    value === u ? 'bg-primary-50 border-primary-600' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text className={value === u ? 'text-primary-700 font-bold' : 'text-slate-600'}>
                    {t(u)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
      </View>

      <Button 
        label={t('save')} 
        onPress={handleSubmit(onSubmit)}
        loading={mutation.isPending}
      />
    </ScrollView>
  );
}
