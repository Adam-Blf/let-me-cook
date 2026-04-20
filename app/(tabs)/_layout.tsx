import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { tokens } from '../../src/design/tokens';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', minWidth: 52 }}>
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          borderWidth: 1.6,
          borderColor: focused ? tokens.ink : tokens.inkFaint,
          backgroundColor: focused ? tokens.ink : 'transparent',
          marginBottom: 3,
        }}
      />
      <Text
        style={{
          fontFamily: tokens.mono,
          fontSize: 9,
          letterSpacing: 1.2,
          color: focused ? tokens.ink : tokens.inkMuted,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tokens.paper,
          borderTopColor: tokens.line,
          height: 78,
          paddingTop: 8,
          paddingBottom: 16,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Biblio" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Search" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Nouvelle" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Courses" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
