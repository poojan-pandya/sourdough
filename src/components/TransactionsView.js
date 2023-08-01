import { Button, StyleSheet, Text, View, } from "react-native";
import React, { useContext, useState } from "react";
import TransactionRow from "./TransactionRow";
import { useFocusEffect } from "@react-navigation/native";
import {
	getTransactionsForMonth,
	getTransactionsByCategoryByMonth,
	deleteTransaction,
} from "../logic/transaction";
import { baseStyles, colors } from "../styles/baseStyles";
import { getAllCategories } from "../logic/categories";
import TransactionContext from "../context/TransactionContext";
import PlusButton from "./PlusButton";

const TransactionsView = ({ month, year, category, navigation }) => {
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);
	const [transactions, setTransactions] = useState([]);
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
					.then((res) => {
						setTransactions(
							res.sort(
								(a, b) =>
									new Date(b.datetime) - new Date(a.datetime)
							)
						);
					})
					.catch((error) => {
						console.log(error);
						res;
					});
			} else {
				getTransactionsForMonth(month, year)
					.then((res) => {
						setTransactions(
							res.sort(
								(a, b) =>
									new Date(b.datetime) - new Date(a.datetime)
							)
						);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}, [allTransactions.length])
	);

	if (transactions.length === 0) {
		return (
			<View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: 10,
					}}
				>
					<Text style={{ ...styles.h1 }}>Transactions</Text>
					<PlusButton
						onPress={() => {
							navigation.navigate("Add");
						}}
					/>
				</View>
				<Text style={{ ...styles.h2, color: colors.gray, marginTop: 10 }}>None right now!</Text>
			</View>
		);
	}

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: 10,
				}}
			>
				<Text style={{ ...styles.h1 }}>Transactions</Text>
				<PlusButton
					onPress={() => {
						navigation.navigate("Add");
					}}
				/>
			</View>
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
							category={transaction.category}
							onDelete={async () => {
								const newTransactions = await deleteTransaction(
									transaction.id
								);
								// This should trigger a re-render
								setAllTransactions(newTransactions);
							}}
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
