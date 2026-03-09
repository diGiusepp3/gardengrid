import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { gardenRepository, fieldRepository } from '@/db/repositories';
import { Card } from '@/components/ui/Card';
import { Sprout, Box, Droplets, PawPrint } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function GardenDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: garden } = useQuery({
    queryKey: ['garden', id],
    queryFn: () => gardenRepository.getGardenById(id as string),
  });

  const { data: fields } = useQuery({
    queryKey: ['fields', id],
    queryFn: () => fieldRepository.getFieldsByGarden(id as string),
  });

  if (!garden) return null;

  // Simple visual map calculation
  const mapPadding = 32;
  const mapWidth = SCREEN_WIDTH - mapPadding;
  const aspectRatio = garden.width / garden.height;
  const mapHeight = mapWidth / aspectRatio;

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <Stack.Screen options={{ title: garden.name, headerShown: true }} />
      
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Garden Map</Text>
        <View 
          className="bg-earth-100 rounded-2xl border-2 border-earth-200 overflow-hidden relative"
          style={{ width: mapWidth, height: mapHeight }}
        >
          {/* Grid lines */}
          <View className="absolute inset-0 opacity-10 flex-row">
             {[...Array(10)].map((_, i) => (
               <View key={i} className="flex-1 border-r border-earth-900" />
             ))}
          </View>
          <View className="absolute inset-0 opacity-10 flex-col">
             {[...Array(10)].map((_, i) => (
               <View key={i} className="flex-1 border-b border-earth-900" />
             ))}
          </View>

          {/* Fields */}
          {fields?.map((field) => (
            <View
              key={field.id}
              className="absolute bg-primary-500/30 border border-primary-600 rounded-sm items-center justify-center"
              style={{
                left: (field.x / garden.width) * mapWidth,
                top: (field.y / garden.height) * mapHeight,
                width: (field.width / garden.width) * mapWidth,
                height: (field.height / garden.height) * mapHeight,
              }}
            >
              <Text className="text-[8px] font-bold text-primary-900 text-center px-1">
                {field.name}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-8 flex-row flex-wrap gap-4">
          <Card className="w-[47%] items-center py-6">
            <Sprout color="#16a34a" size={24} />
            <Text className="font-bold mt-2">Fields</Text>
            <Text className="text-slate-500 text-xs">{fields?.length || 0} active</Text>
          </Card>
          <Card className="w-[47%] items-center py-6">
            <Box color="#b45309" size={24} />
            <Text className="font-bold mt-2">Structures</Text>
            <Text className="text-slate-500 text-xs">0 active</Text>
          </Card>
          <Card className="w-[47%] items-center py-6">
            <Droplets color="#2563eb" size={24} />
            <Text className="font-bold mt-2">Water</Text>
            <Text className="text-slate-500 text-xs">0 points</Text>
          </Card>
          <Card className="w-[47%] items-center py-6">
            <PawPrint color="#7c3aed" size={24} />
            <Text className="font-bold mt-2">Animals</Text>
            <Text className="text-slate-500 text-xs">None</Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
