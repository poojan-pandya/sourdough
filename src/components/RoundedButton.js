import React from "react";
import { colors } from "../styles/baseStyles";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const RoundedButton = ({ enabled, title, onPress, backgroundColor, style }) => {
	if (!enabled) {
		return (
			<View
				style={{
					...styles.button,
					...style,
					backgroundColor: colors.lightGray,
				}}
				onPress={() => {}}
			>
				<Text style={styles.disabledButtonText}>{title}</Text>
			</View>
		);
	}
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				...style,
				backgroundColor: backgroundColor,
			}}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},

	disabledButtonText: {
		color: colors.gray,
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default RoundedButton;
