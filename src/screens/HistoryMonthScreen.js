import { StyleSheet, Text, SafeAreaView, View, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { baseStyles } from "../styles/baseStyles";
import { monthYearToString, totalSpentForMonth } from "../logic/history";
import { useFocusEffect } from "@react-navigation/native";
import {
	getAllCategories,
	getAllCategoriesForMonth,
} from "../logic/categories";
import HistoryCategoryRow from "../components/HistoryCategoryRow";
import { getTransactionsForMonth } from "../logic/transaction";
import TransactionRow from "../components/TransactionRow";
import TransactionsView from "../components/TransactionsView";
import TransactionContext from "../context/TransactionContext";

const HistoryMonthScreen = ({ navigation, route }) => {

	const [categories, setCategories] = useState({});
	const [allCategories, setAllCategories] = useState({});
	const [transactions, setTransactions] = useState([]);
	const [totalSpent, setTotalSpent] = useState(0);
	const { allTransactions, setAllTransactions } = useContext(TransactionContext);

	useFocusEffect(
		React.useCallback(() => {
			totalSpentForMonth(route.params.month, route.params.year)
				.then((totalSpent) => {
					setTotalSpent(totalSpent);
				})
				.catch((error) => {
					console.log(error);
				});
			getAllCategories()
				.then((res) => {
					setAllCategories(res);
				})
				.catch((error) => {
					console.log(error);
				});
			getAllCategoriesForMonth(route.params.month, route.params.year)
				.then((categories) => {
					setCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});
			getTransactionsForMonth(route.params.month, route.params.year)
				.then((transactions) => {
					console.log("Reloaded transactions");
					setTransactions(transactions);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [allTransactions])
	);

	const getEmoji = (category) => {
		return allCategories[category].emoji;
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.h1}>
				{monthYearToString(route.params.month, route.params.year)}
			</Text>
			<Text style={styles.h2}>
				<Text style={styles.h1}>🛍</Text> ${totalSpent.toFixed(2)} spent
			</Text>
			<ScrollView style={{ marginTop: 20 }}>
				{Object.keys(categories).map((category, i) => {
					const categoryObj = categories[category];
					return (
						<View key={categoryObj.id}>
							<HistoryCategoryRow
								text={category}
								emoji={categoryObj.emoji}
								month={route.params.month}
								year={route.params.year}
							/>
						</View>
					);
				})}
				<TransactionsView month={route.params.month} year={route.params.year} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HistoryMonthScreen;

const styles = StyleSheet.create({
	...baseStyles,
});
