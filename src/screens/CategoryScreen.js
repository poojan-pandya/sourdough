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
import React from "react";
import { baseStyles, colors } from "../styles/baseStyles";
import ProgressBar from "../components/ProgressBar";
import GraySquareWithEmoji from "../components/GraySquareWithEmoji";
import { useFocusEffect } from "@react-navigation/native";
import { totalSpentForCategory } from "../logic/calculations";
import RoundedButton from "../components/RoundedButton";
import { getCategoryInfo, setCategoryLimit } from "../logic/categories";
import {
	getTransactionsByCategoryByMonth,
	getTransactionsByCategory,
} from "../logic/transaction";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const CategoryScreen = ({ route }) => {
	const { category } = route.params;
	const [budget, setBudget] = React.useState(0);
	const [emoji, setEmoji] = React.useState("🌮");
	const [transactions, setTransactions] = React.useState([]);
	const [total, setTotal] = React.useState(0);

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

			totalSpentForCategory(category)
				.then((total) => {
					setTotal(total);
				})
				.catch((error) => {
					console.log(error);
				});

			getTransactionsByCategoryByMonth(category, currentMonth, currentYear)
				.then((transactions) => {
					setTransactions(transactions);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [])
	);

	const handleInputChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			/^\d+(\.\d{0,2})?$/.test(filteredText) || filteredText === "";
		if (isValid) {
			setBudget(parseFloat(filteredText));
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
							onChangeText={handleInputChange}
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
						enabled={true}
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

					<Text style={styles.h1}>Transactions</Text>
					{transactions.map((transaction) => {
						return (
							<View key={transaction.id}>
								<GraySquareWithEmoji
									emoji={emoji}
									label={transaction.label}
									date={new Date(
										transaction.datetime
									).toLocaleDateString()}
									amount={transaction.amount}
								/>
							</View>
						);
					})}
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
										onPress: () => {
											Alert.alert("Category deleted");
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
