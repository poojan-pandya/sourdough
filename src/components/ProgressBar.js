import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../styles/baseStyles";

const ProgressBar = ({ progress }) => {
	return (
		<View style={styles.progressBar}>
			<View
				style={[
					styles.progressFill,
					{
						width: `${progress}%`,
						backgroundColor:
							progress >= 100 ? colors.red : colors.blue,
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	progressBar: {
		height: 20,
		backgroundColor: colors.lightGray,
		borderRadius: 5,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors.blue,
		borderRadius: 5,
	},
});

export default ProgressBar;
