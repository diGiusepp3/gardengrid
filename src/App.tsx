import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/i18n';
import DashboardScreen from './app/(tabs)/index';
import GardensScreen from './app/(tabs)/gardens';
import SettingsScreen from './app/(tabs)/settings';
import TasksScreen from './app/(tabs)/tasks';
import WelcomeScreen from './app/(auth)/welcome';
import CreateGardenScreen from './app/gardens/create';
import CreateTaskScreen from './app/tasks/create';
import { useAuthStore } from '@/store/authStore';
import { initDatabase } from '@/db/schema';

const queryClient = new QueryClient();

// Simple navigation state
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await initDatabase();
      } catch (e) {
        console.warn('Database init failed, continuing in memory mode', e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  // Mock router for sub-screens
  const router = {
    push: (path: string) => {
      if (path === '/gardens/create') setCurrentScreen('createGarden');
      if (path === '/tasks/create') setCurrentScreen('createTask');
    },
    back: () => setCurrentScreen(null),
    replace: (path: string) => {
      if (path === '/(tabs)') {
        setCurrentScreen(null);
        setCurrentTab('dashboard');
      }
    }
  };

  // Provide router to window for mock-router.ts to use
  if (typeof window !== 'undefined') {
    (window as any).mockRouter = router;
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <WelcomeScreen />
      </QueryClientProvider>
    );
  }

  const renderContent = () => {
    if (currentScreen === 'createGarden') return <CreateGardenScreen />;
    if (currentScreen === 'createTask') return <CreateTaskScreen />;

    switch (currentTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'gardens': return <GardensScreen />;
      case 'tasks': return <TasksScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ flex: 1 }}>
          {renderContent()}
        </View>
        
        {!currentScreen && (
          <View style={{ 
            flexDirection: 'row', 
            height: 65, 
            borderTopWidth: 1, 
            borderTopColor: '#e2e8f0', 
            backgroundColor: '#fff',
            paddingBottom: 10,
            paddingTop: 10
          }}>
            {[
              { id: 'dashboard', label: 'Home' },
              { id: 'gardens', label: 'Gardens' },
              { id: 'tasks', label: 'Tasks' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => (
              <TouchableOpacity 
                key={tab.id} 
                onPress={() => setCurrentTab(tab.id)}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text 
                  style={{ 
                    color: currentTab === tab.id ? '#16a34a' : '#94a3b8',
                    fontSize: 12,
                    fontWeight: currentTab === tab.id ? 'bold' : 'normal',
                    marginTop: 4
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </QueryClientProvider>
  );
}
