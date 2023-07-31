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

const CategoryScreen = ({ navigation, route }) => {
	const { category } = route.params;
	const [budget, setBudget] = React.useState("");
	const [emoji, setEmoji] = React.useState("🌮");
	const [transactions, setTransactions] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);

	useFocusEffect(
		React.useCallback(() => {
			getCategoryInfo(category)
				.then((categoryInfo) => {
					setEmoji(categoryInfo.emoji);
					setBudget(categoryInfo.limit);
				})
				.catch((error) => {
					console.log(error);
				});

			totalSpentForCategoryForMonth(category, currentMonth, currentYear)
				.then((total) => {
					setTotal(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getTransactionsByCategoryByMonth(
				category,
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

	const handleInputChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			/^\d+(\.\d{0,2})?$/.test(filteredText) || filteredText === "";
		if (isValid) {
			setBudget(parseFloat(filteredText));
		}
	};

	const handleAmountChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			(/^\d+(\.\d{0,2})?$/.test(filteredText) &&
				parseFloat(filteredText) < 100000) ||
			filteredText === "";
		if (isValid) {
			setBudget(filteredText);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ScrollView>
				<SafeAreaView style={styles.container}>
					<Text style={styles.h1}>Budget </Text>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Text style={{ ...baseStyles.h1, color: colors.blue }}>
							$
						</Text>
						<TextInput
							style={{ ...baseStyles.h1, color: colors.blue }}
							keyboardType="numeric"
							onChangeText={handleAmountChange}
							value={budget ? budget.toString() : ""}
							placeholder="0.00"
						/>
					</View>

					<Text style={styles.h1}>per month for</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 20,
						}}
					>
						<Text style={{ ...baseStyles.h1 }}>{category}</Text>
					</View>
					<RoundedButton
						enabled={budget && parseFloat(budget) > 0}
						title="Save"
						backgroundColor={colors.blue}
						style={{ marginBottom: 20 }}
						onPress={() => {
							setBudget(parseFloat(budget).toFixed(2));
							setCategoryLimit(category, budget);
						}}
					/>
					<ProgressBar
						progress={(total / budget) * 100}
					></ProgressBar>
					<Text
						style={{
							...styles.h2,
							marginTop: 10,
							marginBottom: 20,
						}}
					>
						${total.toFixed(2)}{" "}
						<Text style={{ ...styles.bold_p, color: colors.gray }}>
							so far this month
						</Text>
					</Text>

					<TransactionsView
						category={category}
						month={currentMonth}
						year={currentYear}
						navigation={navigation}
					/>

					<RoundedButton
						enabled={true}
						title="Delete Category"
						backgroundColor={colors.red}
						style={{ marginTop: 50, marginBottom: 20 }}
						onPress={() => {
							Alert.alert(
								"Are you sure you want to delete this category?",
								"You can no longer add new transactions to this category. Your existing transactions will remain unaffected.",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "Delete",
										style: "destructive",
										onPress: async () => {
											await deleteCategory(category);
											navigation.goBack();
										},
									},
								]
							);
						}}
					/>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default CategoryScreen;

const styles = StyleSheet.create({
	...baseStyles,
});
