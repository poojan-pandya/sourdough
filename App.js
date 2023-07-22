import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreenStack from './src/screens/AddScreenStack';
import ThisMonthScreenStack from './src/screens/ThisMonthScreenStack';
import HistoryScreenStack from './src/screens/HistoryScreenStack';
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from './src/styles/baseStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'This Month') {
              iconName = focused
                ? 'calendar'
                : 'calendar-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: colors.gray,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#f2f2f2',
            borderTopWidth: 0,
          },
        })}
        >
          <Tab.Screen name="This Month" component={ThisMonthScreenStack} />
          <Tab.Screen name="Add" component={AddScreenStack} />
          <Tab.Screen name="History" component={HistoryScreenStack}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;