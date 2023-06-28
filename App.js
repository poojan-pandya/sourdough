import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import { NativeBaseProvider, Box } from "native-base";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false
        }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;