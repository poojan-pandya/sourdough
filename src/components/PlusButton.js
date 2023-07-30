import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { baseStyles, colors } from "../styles/baseStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

const PlusButton = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
            <Ionicons name="add-circle" size={55} color={colors.blue} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	circle: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default PlusButton;
