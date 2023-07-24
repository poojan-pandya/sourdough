import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Alert,
	Animated
} from "react-native";
import { baseStyles, colors } from "../styles/baseStyles";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { deleteTransaction } from "../logic/transaction";

const renderRightActions = (progress, dragX, id, onDelete) => {
	const trans = dragX.interpolate({
		inputRange: [0, 50, 100, 101],
		outputRange: [0, 0, 0, 0],
	}, {useNativeDriver: true});
	return (
		<RectButton
			style={styles.rightAction}
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
							onPress: onDelete
						},
					]
				);
			}}
		>
			<Animated.Text
				style={[
					baseStyles.bold_p,
					{
						transform: [{ translateX: trans }],
						color: "white",
						paddingRight: 10,
					},
				]}
				
			>
				Delete
			</Animated.Text>
		</RectButton>
	);
};

const TransactionRow = ({ emoji, label, date, amount, id, onDelete }) => {
	const rowRef = React.useRef(null);
	return (
		<Swipeable
			renderRightActions={(progress, dragX) => {
				return renderRightActions(progress, dragX, id, onDelete);
			}}
			rightThreshold={50}
			ref={rowRef}
		>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<View style={styles.graySquare}>
						<Text style={styles.emoji}>{emoji}</Text>
					</View>
				</View>
				<View style={styles.middleContainer}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.date}>{date}</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.amount}>${amount.toFixed(2)}</Text>
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
		alignItems: "flex-end",
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.red,
		borderRadius: 8,
	},
});

export default TransactionRow;
