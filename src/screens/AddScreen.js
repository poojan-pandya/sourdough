import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import RoundedButton from "../components/RoundedButton";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { baseStyles, colors } from "../styles/baseStyles";
import { Picker } from "@react-native-picker/picker";
import { addNewTransaction } from "../logic/transaction";
import { getAllCategories } from "../logic/categories";
import uuid from "react-native-uuid";

const AddScreen = () => {
	const [selectedCategory, setSelectedCategory] = React.useState("Income");
	const [categories, setCategories] = React.useState({});
	const [amount, setAmount] = React.useState("");
	const [label, setLabel] = React.useState("");
	const amountRef = React.useRef(null);
	const amountFocused = useIsFocused();

	React.useEffect(() => {
		// This is a hack to ensure the numeric keyboard comes up every time we navigate to this screen
		if (amountFocused) {
			amountRef.current.focus();
		}

		getAllCategories()
			.then((categories) => {
				setCategories(categories);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			// Cleanup function to unfocus the TextInput when navigating away
			cleanup();
			amountRef.current.blur();
		};
	}, [amountFocused]);

	const handleInputChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			/^\d+(\.\d{0,2})?$/.test(filteredText) || filteredText === "";
		if (isValid) {
			setAmount(filteredText);
		}
	};

	const cleanup = () => {
		setAmount("");
		setLabel("");
		setSelectedCategory("Income");
		amountRef.current.focus();
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.h1}>Add </Text>
					<Text style={{ ...baseStyles.h1, color: colors.blue }}>
						$
					</Text>
					<TextInput
						ref={amountRef}
						style={{ ...baseStyles.h1, color: colors.blue }}
						keyboardType="numeric"
						onChangeText={handleInputChange}
						value={amount}
						placeholder="0.00"
					/>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.h1}>For </Text>
					<TextInput
						style={{ ...baseStyles.h1, color: colors.blue }}
						onChangeText={(text) => setLabel(text)}
						value={label}
						placeholder="bread"
					/>
				</View>

				<Picker
					itemStyle={baseStyles.bold_p}
					selectedValue={selectedCategory}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedCategory(itemValue)
					}
				>
					{Object.keys(categories).map((category, i) => {
						return (
							<Picker.Item
								key={i}
								label={`${category} ${categories[category].emoji}`}
								value={category}
							/>
						);
					})}
				</Picker>

				<RoundedButton
					enabled={amount > 0 && label !== ""}
					title="Save"
					backgroundColor={colors.blue}
					style={{ marginTop: 20 }}
					onPress={async () => {
						const datetime = new Date();
						await addNewTransaction({
							id: uuid.v4(),
							amount: parseFloat(amount),
							label,
							category: selectedCategory,
							datetime: datetime.toISOString(),
						});
						cleanup();
					}}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	...baseStyles,
});
