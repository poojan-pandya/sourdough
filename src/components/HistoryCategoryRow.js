import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseStyles, colors, padding } from "../styles/baseStyles";
import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
	totalEarnedForMonth,
	totalSpentForCategoryForMonth,
} from "../logic/history";
import TransactionContext from "../context/TransactionContext";

const HistoryCategoryRow = ({ text, month, year, emoji, onPress }) => {
	const { allTransactions, setAllTransactions } =
		useContext(TransactionContext);

	const [amount, setAmount] = React.useState(0);

	useFocusEffect(
		React.useCallback(() => {
			totalSpentForCategoryForMonth(text, month, year)
				.then((total) => {
					setAmount(total);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [allTransactions.length])
	);

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					...styles.card,
					backgroundColor:
						text === "Income"
							? colors.lightGreen
							: colors.lightGray,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "space-between",
							height: 60,
						}}
					>
						<Text style={styles.bold_p}>{text}</Text>
						<Text style={{ ...styles.bold_p }}>${amount}</Text>
					</View>
					<View
						style={{
							flexDirection: "col",
							justifyContent: "center",
						}}
					>
						<Text style={styles.h1}>{emoji}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default HistoryCategoryRow;

const styles = StyleSheet.create({
	...baseStyles,
	card: {
		backgroundColor: colors.lightGray,
		padding: padding.sm,
		borderRadius: 10,
		marginBottom: 10,
		height: 80,
	},
});
