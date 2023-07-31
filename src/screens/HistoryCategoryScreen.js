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
import {
	monthYearToString,
	totalSpentForCategoryForMonth,
} from "../logic/history";
import TransactionsView from "../components/TransactionsView";
import TransactionContext from "../context/TransactionContext";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const HistoryCategoryScreen = ({
	category,
	month,
	year,
	navigation,
	route,
}) => {
    ({ category, month, year } = route.params);

	const [transactions, setTransactions] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);

	const earnedOrSpent = category == "Income" ? "earned" : "spent";

	useFocusEffect(
		React.useCallback(() => {
			totalSpentForCategoryForMonth(category, month, year)
				.then((total) => {
					setTotal(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getTransactionsByCategoryByMonth(category, month, year)
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
					<Text style={styles.h1}>{category}</Text>
					<View style={styles.header}>
						<Text style={{ ...styles.h2 }}>
							${total} {earnedOrSpent}
						</Text>
					</View>
					<TransactionsView
						category={category}
						month={month}
						year={year}
						navigation={navigation}
					/>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default HistoryCategoryScreen;

const styles = StyleSheet.create({
	...baseStyles,
	header: {
		backgroundColor: colors.lightGreen,
		borderRadius: 25,
		padding: 10,
		marginVertical: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
