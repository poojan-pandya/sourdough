import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreenStack from './src/screens/AddScreenStack';
import ThisMonthScreenStack from './src/screens/ThisMonthScreenStack';

const Tab = createBottomTabNavigator();

function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="This Month" component={ThisMonthScreenStack} />
          <Tab.Screen name="Add" component={AddScreenStack} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;