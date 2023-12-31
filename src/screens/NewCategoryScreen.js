import {
	StyleSheet,
	Text,
	TextInput,
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import RoundedButton from "../components/RoundedButton";
import { baseStyles, colors } from "../styles/baseStyles";
import React from "react";
import { addNewCategory, getCategoryInfo, isDuplicateCategory, isActive } from "../logic/categories";
import { chooseRandomEmoji } from "../logic/emojis";

const NewCategoryScreen = ({ navigation, route }) => {
	const [budget, setBudget] = React.useState("");
	const [emoji, setEmoji] = React.useState(chooseRandomEmoji());
	const [category, setCategory] = React.useState("");

	const handleLabelChange = (text) => {
		const isValid = /^[a-zA-Z ]*$/.test(text) && text.length <= 15;
		if (isValid) {
			setCategory(text);
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

	const handleEmojiChange = (text) => {
		const emojiRegex = /\p{Emoji}/u;
		if (text === "" || (!emoji && emojiRegex.test(text))) {
			setEmoji(text);
		}
	};

	const handleEmojiBlur = () => {
		if (!emoji) {
			setEmoji(chooseRandomEmoji());
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.h1}>Budget </Text>
				<View style={styles.budgetInputContainer}>
					<Text style={styles.budgetInput}>$</Text>
					<TextInput
						contextMenuHidden={true}
						style={styles.budgetInput}
						keyboardType="numeric"
						onChangeText={handleAmountChange}
						value={budget ? budget.toString() : ""}
						placeholder="0.00"
					/>
				</View>

				<Text style={styles.h1}>per month for</Text>
				<View style={styles.labelInputContainer}>
					<TextInput
						contextMenuHidden={true}
						style={styles.h1}
						placeholder="Groceries"
						onChangeText={handleLabelChange}
						value={category}
					/>
					{/* Empty space */}
					<Text style={styles.h1}> </Text>
					<TextInput
						contextMenuHidden={true}
						style={styles.h1}
						onChangeText={handleEmojiChange}
						onBlur={handleEmojiBlur}
						value={emoji}
					/>
				</View>
				<RoundedButton
					enabled={category && category.trim().length > 0 && emoji && budget && parseFloat(budget) > 0}
					title="Save"
					backgroundColor={colors.blue}
					style={styles.saveButton}
					onPress={async () => {
						if (await isActive(category)) {
							alert("You already have an active category with that name!");
						} else {
							await addNewCategory(category.trim(), budget, emoji);
							navigation.goBack();
						}
					}}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default NewCategoryScreen;

const styles = StyleSheet.create({
	...baseStyles,

	budgetInput: {
		...baseStyles.h1,
		color: colors.blue,
	},

	budgetInputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},

	labelInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		width: "85%",
	},

	saveButton: {
		marginBottom: 20,
	},
});
