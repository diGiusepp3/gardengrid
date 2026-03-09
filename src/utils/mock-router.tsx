import React, { useState, createContext, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Mock navigation context
const NavigationContext = createContext<any>(null);

export const useRouter = () => {
  const ctx = useContext(NavigationContext);
  return ctx?.router || {
    push: () => {},
    replace: () => {},
    back: () => {},
  };
};

export const useLocalSearchParams = () => ({});

export const Stack = ({ children, screenOptions }: any) => {
  // In a real mock, we'd handle screen switching here.
  // For this environment, we'll just render the children.
  return <View style={{ flex: 1 }}>{children}</View>;
};

Stack.Screen = ({ children, name, options }: any) => {
  // Simple mock: only render if it's the "active" screen
  // But for simplicity in this environment, we'll just render children if they are provided as a component
  if (typeof children === 'function') return children();
  return children || null;
};

export const Tabs = ({ children, screenOptions }: any) => {
  const [activeTab, setActiveTab] = useState('index');
  
  // Extract tab info from children
  const tabs = React.Children.toArray(children).filter((child: any) => child.type === Tabs.Screen);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {tabs.map((tab: any) => {
          if (tab.props.name === activeTab) {
            return <View key={tab.props.name} style={{ flex: 1 }}>{tab}</View>;
          }
          return null;
        })}
      </View>
      <View style={{ 
        flexDirection: 'row', 
        height: 65, 
        borderTopWidth: 1, 
        borderTopColor: '#e2e8f0', 
        backgroundColor: '#fff',
        paddingBottom: 10,
        paddingTop: 10
      }}>
        {tabs.map((tab: any) => (
          <TouchableOpacity 
            key={tab.props.name} 
            onPress={() => setActiveTab(tab.props.name)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ 
              color: activeTab === tab.props.name ? '#16a34a' : '#94a3b8',
              fontSize: 12,
              fontWeight: activeTab === tab.props.name ? 'bold' : 'normal'
            }}>
              {tab.props.options?.title || tab.props.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

Tabs.Screen = ({ children, name, options }: any) => {
  if (typeof children === 'function') return children();
  return children || null;
};

export const Redirect = ({ href }: any) => {
  console.log('Redirecting to', href);
  return null;
};

export const Link = ({ children, href }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(href)}>
      {children}
    </TouchableOpacity>
  );
};
