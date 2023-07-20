import { StyleSheet, Text, SafeAreaView, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { baseStyles } from "../styles/baseStyles";
import { monthYearToString, totalSpentForMonth } from "../logic/history";
import { useFocusEffect } from "@react-navigation/native";
import { getAllCategories } from "../logic/categories";
import HistoryCategoryRow from "../components/HistoryCategoryRow";
import { getTransactionsForMonth } from "../logic/transaction";
import GraySquareWithEmoji from "../components/GraySquareWithEmoji";

const HistoryMonthScreen = ({ navigation, route }) => {
	const [categories, setCategories] = useState({});
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
				.then((categories) => {
					setCategories(categories);
					console.log(categories);
				})
				.catch((error) => {
					console.log(error);
				});
			getTransactionsForMonth(route.params.month, route.params.year)
				.then((transactions) => {
					setTransactions(transactions);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [])
	);

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
						<View key={i}>
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
						<View key={i}>
							<GraySquareWithEmoji
								emoji={categories[transaction.category].emoji}
								label={transaction.label}
								date={new Date(
									transaction.datetime
								).toLocaleDateString()}
								amount={transaction.amount}
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
