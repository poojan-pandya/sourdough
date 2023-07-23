import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import { useFocusEffect } from "@react-navigation/native";
import {
	getTransactionsForMonth,
	getTransactionsByCategoryByMonth,
} from "../logic/transaction";
import { baseStyles } from "../styles/baseStyles";
import { getAllCategories } from "../logic/categories";

const TransactionsView = ({ month, year, category }) => {
	const [transactions, setTransactions] = useState([]);
	// const [refresh, setRefresh] = useState(false);
	const [allCategories, setAllCategories] = useState({});

	const getEmoji = (category) => {
		return allCategories[category].emoji;
	};

	useFocusEffect(
		React.useCallback(() => {
			getAllCategories()
				.then((categories) => {
					setAllCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});
			if (category) {
				getTransactionsByCategoryByMonth(category, month, year)
					.then((transactions) => {
						setTransactions(transactions);
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				getTransactionsForMonth(month, year)
					.then((transactions) => {
						setTransactions(transactions);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}, [])
	);

	return (
		<View>
			<Text style={{ ...styles.h1, marginTop: 10 }}>Transactions</Text>
			{transactions.map((transaction) => {
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
		</View>
	);
};

export default TransactionsView;

const styles = StyleSheet.create({
	...baseStyles,
});
