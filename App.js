import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverviewScreen from './src/screens/OverviewScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddScreen from './src/screens/AddScreen';

const Tab = createBottomTabNavigator();

function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="This Month" component={OverviewScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;