import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThisMonthScreen from "./ThisMonthScreen";
import CategoryScreen from "./CategoryScreen";
import { colors } from "../styles/baseStyles";
import NewCategoryScreen from "./NewCategoryScreen";

const Stack = createNativeStackNavigator();

const ThisMonthScreenStack = () => {
	const headerOptions = {
		headerTitle: () => <View />,
		headerShadowVisible: false,
		headerTintColor: colors.blue,
		headerStyle: {
			backgroundColor: "#f2f2f2",
		},
	};
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="This Month Stack"
				component={ThisMonthScreen}
				options={{ title: "This Month", ...headerOptions }}
			/>
			<Stack.Screen
				name="Category Screen"
				component={CategoryScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name="New Category Screen"
				component={NewCategoryScreen}
				options={headerOptions}
			/>
		</Stack.Navigator>
	);
};

export default ThisMonthScreenStack;
