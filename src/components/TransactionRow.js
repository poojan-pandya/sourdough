import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { baseStyles, colors } from "../styles/baseStyles";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const renderRightActions = (progress, dragX, onDelete) => {
	return (
		<View style={{ width: 100 }}>
			<RectButton
				style={styles.rightAction}
				onPress={() => {
					Alert.alert(
						"Are you sure you want to delete this transaction?",
						"This action cannot be undone.",
						[
							{
								text: "Cancel",
								style: "cancel",
							},
							{
								text: "Delete",
								style: "destructive",
								onPress: onDelete,
							},
						]
					);
				}}
			>
				<Text style={[baseStyles.bold_p, { color: "white" }]}>
					Delete
				</Text>
			</RectButton>
		</View>
	);
};

const TransactionRow = ({
	emoji,
	label,
	date,
	amount,
	id,
	category,
	onDelete,
}) => {
	const rowRef = React.useRef(null);
	return (
		<Swipeable
			renderRightActions={(progress, dragX) => {
				return renderRightActions(progress, dragX, onDelete);
			}}
			rightThreshold={50}
			overshootRight={false}
			ref={rowRef}
			useNativeAnimations={true}
		>
			<View style={[styles.container]}>
				<View style={styles.leftContainer}>
					<View
						style={[
							styles.graySquare,
							{
								backgroundColor:
									category === "Income"
										? colors.lightGreen
										: colors.lightGray,
							},
						]}
					>
						<Text style={styles.emoji}>{emoji}</Text>
					</View>
				</View>
				<View style={styles.middleContainer}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.date}>{date}</Text>
				</View>
				<View style={[styles.rightContainer]}>
					<Text
						style={[
							styles.amount,
							{
								color:
									category === "Income"
										? colors.green
										: colors.red,
							},
						]}
					>
						{category === "Income" ? "+" : "–"} ${amount.toFixed(2)}
					</Text>
				</View>
			</View>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
		borderRadius: 8,
	},
	leftContainer: {
		marginRight: 16,
	},
	graySquare: {
		backgroundColor: colors.lightGray,
		borderRadius: 8,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	emoji: {
		fontSize: baseStyles.h1.fontSize,
	},
	middleContainer: {
		flex: 1,
		marginRight: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	date: {
		fontSize: 16,
		color: colors.gray,
	},
	rightContainer: {
		alignItems: "flex-end",
	},
	amount: {
		fontSize: 20,
		fontWeight: "bold",
	},
	leftAction: {
		flex: 1,
		backgroundColor: "#497AFC",
		justifyContent: "center",
	},
	actionText: {
		color: "white",
		fontSize: 16,
		backgroundColor: "transparent",
		padding: 10,
	},
	rightAction: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.red,
		borderRadius: 8,
	},
});

export default TransactionRow;
