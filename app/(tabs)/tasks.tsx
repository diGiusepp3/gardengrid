import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, Circle, Clock, Plus, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskRepository } from '@/db/repositories';
import { useAuthStore } from '@/store/authStore';
import { Task } from '@/types';

export default function TasksScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user) || { id: 'default-user' };

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', user.id],
    queryFn: () => taskRepository.getTasks(user.id),
  });

  const toggleTaskMutation = useMutation({
    mutationFn: (task: Task) => taskRepository.updateTask({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const TaskItem = ({ task }: { task: Task; key?: string }) => (
    <Card className="mb-3 flex-row items-center">
      <TouchableOpacity 
        className="mr-4"
        onPress={() => toggleTaskMutation.mutate(task)}
      >
        {task.status === 'completed' ? (
          <CheckCircle2 color="#16a34a" size={24} />
        ) : (
          <Circle color="#94a3b8" size={24} />
        )}
      </TouchableOpacity>
      <View className="flex-1">
        <Text className={`font-bold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
          {task.title}
        </Text>
        <Text className="text-slate-500 text-xs">{task.date}</Text>
        {task.reminderAt && (
          <View className="flex-row items-center mt-1">
            <Bell size={10} color="#16a34a" className="mr-1" />
            <Text className="text-primary-600 text-[10px] font-medium">
              Reminder: {task.reminderAt}
            </Text>
          </View>
        )}
      </View>
      <Clock size={16} color="#94a3b8" />
    </Card>
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-slate-900">Tasks</Text>
          <TouchableOpacity 
            onPress={() => router.push('/tasks/create')}
            className="bg-primary-600 w-10 h-10 rounded-full items-center justify-center shadow-lg shadow-primary-600/30"
          >
            <Plus color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        {tasks && tasks.length > 0 ? (
          <View>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-slate-400 italic">No tasks yet. Create one to get started!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
