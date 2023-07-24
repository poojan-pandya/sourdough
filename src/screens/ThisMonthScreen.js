import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { baseStyles, colors } from "../styles/baseStyles";
import CategoryRow from "../components/CategoryRow";
import { totalSpentThisMonth } from "../logic/calculations";
import { getAllActiveCategories, getAllCategories } from "../logic/categories";
import { useFocusEffect } from "@react-navigation/native";
import RoundedButton from "../components/RoundedButton";
import { getAllTransactions, getTransactionsForMonth } from "../logic/transaction";
import TransactionRow from "../components/TransactionRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionsView from "../components/TransactionsView";
import { calculateTotalSpent } from "../logic/newlogic";
import TransactionContext from "../context/TransactionContext";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const ThisMonthScreen = ({ navigation, route }) => {
	const [allCategories, setAllCategories] = useState({});
	const [activeCategories, setActiveCategories] = useState({});
	const [totalSpent, setTotalSpent] = useState(0);
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);
	const [transactions, setTransactions] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const getEmoji = (category) => {
		return allCategories[category].emoji;
	};

	useFocusEffect(
		React.useCallback(() => {
			getAllTransactions()
				.then((res) => {
					setAllTransactions(res);
				})
				.catch((error) => {
					console.log('hello', error);
				});
			getTransactionsForMonth(currentMonth, currentYear)
				.then((transactions) => {
					setTransactions(transactions);
				})
				.catch((error) => {
					console.log(error);
				});
			totalSpentThisMonth()
				.then((total) => {
					setTotalSpent(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getAllActiveCategories()
				.then((categories) => {
					setActiveCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});

			getAllCategories()
				.then((categories) => {
					setAllCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [allTransactions])
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.h1}>This Month</Text>
			<Text style={styles.h2}>
				<Text style={styles.h1}>🛍</Text> ${totalSpent.toFixed(2)} spent
			</Text>
			<View style={{ flexDirection: "row-reverse" }}>
				<RoundedButton
					style={styles.newCategoryButton}
					enabled={true}
					title="New Category"
					backgroundColor={colors.blue}
					onPress={() => {
						navigation.navigate("New Category Screen");
					}}
				/>
			</View>
			<ScrollView style={styles.allCategoriesScroll}>
				{Object.keys(activeCategories).map((category, i) => {
					const categoryObj = activeCategories[category];
					return (
						<View key={categoryObj.id}>
							<CategoryRow
								text={category}
								limit={categoryObj.limit}
								emoji={categoryObj.emoji}
								onPress={
									category !== "Income"
										? () => {
												navigation.navigate(
													"Category Screen",
													{ category: category }
												);
										  }
										: () => {}
								}
							/>
						</View>
					);
				})}
				<TransactionsView
					month={currentMonth}
					year={currentYear}
					onDelete={() => {
						setRefresh(!refresh);
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ThisMonthScreen;

const styles = StyleSheet.create({
	...baseStyles,
	newCategoryButton: {
		marginTop: 20,
		width: "50%",
	},

	allCategoriesScroll: {
		marginTop: 20,
	},
});
