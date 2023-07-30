import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	Alert,
} from "react-native";
import React, { useContext } from "react";
import { baseStyles, colors } from "../styles/baseStyles";
import ProgressBar from "../components/ProgressBar";
import { useFocusEffect } from "@react-navigation/native";
import RoundedButton from "../components/RoundedButton";
import {
	getCategoryInfo,
	setCategoryLimit,
	deleteCategory,
} from "../logic/categories";
import { getTransactionsByCategoryByMonth } from "../logic/transaction";
import { totalSpentForCategoryForMonth } from "../logic/history";
import TransactionsView from "../components/TransactionsView";
import TransactionContext from "../context/TransactionContext";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const IncomeScreen = ({ navigation, route }) => {
	const [transactions, setTransactions] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);

	useFocusEffect(
		React.useCallback(() => {
			totalSpentForCategoryForMonth("Income", currentMonth, currentYear)
				.then((total) => {
					setTotal(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getTransactionsByCategoryByMonth(
				"Income",
				currentMonth,
				currentYear
			)
				.then((transactions) => {
					setTransactions(transactions);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [allTransactions.length])
	);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ScrollView>
				<SafeAreaView style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.h1}>Earned </Text>
						<Text style={{ ...styles.h1, color: colors.blue }}>
							${total}
						</Text>
						<Text style={styles.h1}>this month</Text>
					</View>
					<TransactionsView
						category={"Income"}
						month={currentMonth}
						year={currentYear}
						navigation={navigation}
					/>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default IncomeScreen;

const styles = StyleSheet.create({
	...baseStyles,
	header: {
		backgroundColor: colors.lightGreen,
		borderRadius: 8,
		padding: 10,
        marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
