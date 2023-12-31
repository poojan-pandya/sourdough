// Baseline styles for the app

import { StyleSheet } from "react-native";

// export const colors = {
// 	blue: "#1155CC",
// 	lightGreen: "#ceedc7",
// 	lightRed: "#FBE2E2",
// 	lightGray: "#e5e5e5",
// 	gray: "#808080",
// 	red: "#cd2f2b",
// 	green: "#36791b",
//     black: "#000000",
// };

export const colors = {
	blue: "#213363",
	lightGreen: "#abd9f5",
	lightRed: "#FBE2E2",
	lightGray: "#e5e5e5",
	gray: "#808080",
	red: "#cd2f2b",
	green: "#36791b",
    black: "#000000",
};

export const padding = {
	sm: 10,
	md: 20,
	lg: 30,
	xl: 40,
};

export const fonts = {
	sm: 18,
	md: 24,
	lg: 44,
	primary: "Cochin",
};

export const baseStyles = StyleSheet.create({
	h1: {
		fontSize: fonts.lg,
		fontWeight: "bold",
	},

	h2: {
		fontSize: fonts.md,
		fontWeight: "bold",
	},

	bold_p: {
		fontWeight: "bold",
		fontSize: fonts.sm,
	},

	container: {
		flex: 1,
		flexDirection: "column",
		marginVertical: 0,
		marginHorizontal: 30,
	},
});
