import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { baseStyles, colors } from "../styles/baseStyles";
import CategoryRow from "../components/CategoryRow";
import { totalSpentThisMonth } from "../logic/calculations";
import { getAllCategories } from "../logic/categories";
import { useFocusEffect } from "@react-navigation/native";
import RoundedButton from "../components/RoundedButton";
import { getTransactionsForMonth } from "../logic/transaction";
import GraySquareWithEmoji from "../components/GraySquareWithEmoji";
import AsyncStorage from "@react-native-async-storage/async-storage";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const ThisMonthScreen = ({ navigation, route }) => {
	const [categories, setCategories] = useState({});
	const [totalSpent, setTotalSpent] = useState(0);
	const [transactions, setTransactions] = useState([]);

	const getEmoji = (category) => {
		return categories[category].emoji;
	};

	useFocusEffect(
		React.useCallback(() => {
			totalSpentThisMonth()
				.then((total) => {
					setTotalSpent(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getAllCategories()
				.then((categories) => {
					setCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});

			getTransactionsForMonth(currentMonth, currentYear)
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
				{Object.keys(categories).map((category, i) => {
					const categoryObj = categories[category];
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
				<Text style={{ ...styles.h1, marginTop: 10 }}>
					Transactions
				</Text>
				{transactions.map((transaction) => {
					return (
						<View key={transaction.id}>
							<GraySquareWithEmoji
								emoji={getEmoji(transaction.category)}
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
