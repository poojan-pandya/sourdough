import React from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddScreen from './AddScreen'
import { colors } from '../styles/baseStyles';

const Stack = createNativeStackNavigator();

const AddScreenStack = () => {
  const headerOptions = {
    headerTitle: () => <View />,
    headerShadowVisible: false,
    headerTintColor: colors.blue,
    headerStyle: {
      backgroundColor: '#f2f2f2',
    }
  }
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Add Screen Stack" component={AddScreen} options={{title: "Add", ...headerOptions}}/>
      </Stack.Navigator>
  )
}

export default AddScreenStack