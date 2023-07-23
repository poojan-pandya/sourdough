import { StyleSheet, Text, SafeAreaView, View, ScrollView } from "react-native";
import React, { useState } from "react";
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

const HistoryMonthScreen = ({ navigation, route }) => {

	const [categories, setCategories] = useState({});
	const [allCategories, setAllCategories] = useState({});
	const [transactions, setTransactions] = useState([]);
	const [totalSpent, setTotalSpent] = useState(0);

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
		}, [])
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
				<Text style={{ ...styles.h1, marginTop: 10 }}>
					Transactions
				</Text>
				{transactions.map((transaction, i) => {
					return (
						<View key={transaction.id}>
							<TransactionRow
								emoji={getEmoji(transaction.category)}
								label={transaction.label}
								date={new Date(
									transaction.datetime
								).toLocaleDateString()}
								amount={transaction.amount}
								id={transaction.id}
							/>
						</View>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HistoryMonthScreen;

const styles = StyleSheet.create({
	...baseStyles,
});
