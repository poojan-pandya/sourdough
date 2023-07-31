import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from "./HistoryScreen";
import { colors } from "../styles/baseStyles";
import HistoryMonthScreen from "./HistoryMonthScreen";
import HistoryCategoryScreen from "./HistoryCategoryScreen";

const Stack = createNativeStackNavigator();

const HistoryScreenStack = () => {
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
				name="History Screen Stack"
				component={HistoryScreen}
				options={{ title: "History", ...headerOptions }}
			/>
			<Stack.Screen
				name="History Month Screen"
				component={HistoryMonthScreen}
				options={{ title: "", ...headerOptions }}
			/>
			<Stack.Screen
				name="History Category Screen"
				component={HistoryCategoryScreen}
				options={{ title: "History Category", ...headerOptions }}
			/>
		</Stack.Navigator>
	);
};

export default HistoryScreenStack;
