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
import { addNewCategory, isDuplicateCategory } from "../logic/categories";
import { chooseRandomEmoji } from "../logic/emojis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewCategoryScreen = ({ navigation, route }) => {
	const [budget, setBudget] = React.useState(0);
	const [emoji, setEmoji] = React.useState("🌮");
	const [category, setCategory] = React.useState("");

	const handleLabelChange = (text) => {
		const isValid = (/^[a-zA-Z]*$/.test(text) && text.length <= 15);
		if (isValid) {
			setCategory(text);
		}
	}

	const handleAmountChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			(/^\d+(\.\d{0,2})?$/.test(filteredText) || filteredText === "");
		if (isValid) {
			setBudget(parseFloat(filteredText));
		}
	};

	const handleEmojiChange = (text) => {
		const emojiRegex = /\p{Emoji}/u;
        if ((text === "") || (!emoji && emojiRegex.test(text))){
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
					enabled={category && emoji && budget}
					title="Save"
					backgroundColor={colors.blue}
					style={styles.saveButton}
					onPress={async () => {
						if (await isDuplicateCategory(category, emoji)) {
							alert("Category or emoji already used!");
						} else {
							await addNewCategory(category, budget, emoji);
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
		width: "85%"
	},

	saveButton: {
		marginBottom: 20,
	},
});
