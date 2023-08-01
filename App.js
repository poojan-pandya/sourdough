import * as React from "react";
import { Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddScreenStack from "./src/screens/AddScreenStack";
import ThisMonthScreenStack from "./src/screens/ThisMonthScreenStack";
import HistoryScreenStack from "./src/screens/HistoryScreenStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "./src/styles/baseStyles";
import TransactionContext from "./src/context/TransactionContext";
import { useState } from "react";

const Tab = createBottomTabNavigator();

function App() {
	const [allTransactions, setAllTransactions] = useState([]);

	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.allowFontScaling = false;
	TextInput.defaultProps = TextInput.defaultProps || {};
	TextInput.defaultProps.allowFontScaling = false;

	return (
		<TransactionContext.Provider
			value={{ allTransactions, setAllTransactions }}
		>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === "This Month") {
								iconName = focused
									? "calendar"
									: "calendar-outline";
							} else if (route.name === "Add") {
								iconName = focused
									? "add-circle"
									: "add-circle-outline";
							} else if (route.name === "History") {
								iconName = focused
									? "ios-list"
									: "ios-list-outline";
							}

							return (
								<Ionicons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						},
						tabBarActiveTintColor: colors.blue,
						tabBarInactiveTintColor: colors.gray,
						headerShown: false,
						tabBarStyle: {
							backgroundColor: "#f2f2f2",
							borderTopWidth: 0,
						},
					})}
				>
					<Tab.Screen
						name="This Month"
						component={ThisMonthScreenStack}
					/>
					<Tab.Screen name="Add" component={AddScreenStack} />
					<Tab.Screen name="History" component={HistoryScreenStack} />
				</Tab.Navigator>
			</NavigationContainer>
		</TransactionContext.Provider>
	);
}

export default App;
