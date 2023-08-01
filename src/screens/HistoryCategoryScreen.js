import { useFocusEffect } from "@react-navigation/native";
import React, { useContext } from "react";
import {
	Keyboard,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import TransactionsView from "../components/TransactionsView";
import TransactionContext from "../context/TransactionContext";
import { totalSpentForCategoryForMonth } from "../logic/history";
import { getTransactionsByCategoryByMonth } from "../logic/transaction";
import { baseStyles, colors } from "../styles/baseStyles";

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
