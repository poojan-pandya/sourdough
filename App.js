import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThisMonthScreen from './src/screens/ThisMonthScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddScreen from './src/screens/AddScreen';
import CategoryScreen from './src/screens/CategoryScreen';

const Tab = createBottomTabNavigator();

function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="This Month" component={ThisMonthScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
          <Tab.Screen name="Category Screen" component={CategoryScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;