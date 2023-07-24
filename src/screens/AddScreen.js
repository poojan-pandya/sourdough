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
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { baseStyles, colors } from "../styles/baseStyles";
import { Picker } from "@react-native-picker/picker";
import { addNewTransaction } from "../logic/transaction";
import { getAllActiveCategories } from "../logic/categories";
import uuid from "react-native-uuid";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddScreen = () => {
	const [selectedCategory, setSelectedCategory] = React.useState("Income");
	const [activeCategories, setActiveCategories] = React.useState({});
	const [amount, setAmount] = React.useState("");
	const [label, setLabel] = React.useState("");
	const [pickerExpanded, setPickerExpanded] = React.useState(false);
	const [date, setDate] = React.useState(new Date());
	const amountRef = React.useRef(null);
	const amountFocused = useIsFocused();

	useFocusEffect(
		React.useCallback(() => {
			amountRef.current.focus();
			getAllActiveCategories()
				.then((categories) => {
					setActiveCategories(categories);
				})
				.catch((error) => {
					console.log(error);
				});
			return () => {
				cleanup();
			};
		}, [])
	);

	const handleLabelChange = (text) => {
		const isValid = /^[a-zA-Z ]*$/.test(text) && text.length <= 15;
		if (isValid) {
			setLabel(text);
		}
	};

	const handleAmountChange = (text) => {
		const filteredText = text.replace(/[^0-9.]/g, "");
		const isValid =
			(/^\d+(\.\d{0,2})?$/.test(filteredText) &&
				parseFloat(filteredText) < 100000) ||
			filteredText === "";
		if (isValid) {
			setAmount(filteredText);
		}
	};

	const cleanup = () => {
		setAmount("");
		setLabel("");
		setSelectedCategory("Income");
		setDate(new Date());
		amountRef.current.focus();
	};

	const getPickerHeight = (expanded) => {
		if (expanded) {
			return 200;
		} else {
			return 50;
		}
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
						onChangeText={handleAmountChange}
						value={amount}
						placeholder="0.00"
					/>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: "80%",
					}}
				>
					<Text style={styles.h1}>For </Text>
					<TextInput
						style={{ ...baseStyles.h1, color: colors.blue }}
						onChangeText={handleLabelChange}
						value={label}
						placeholder="bread"
					/>
				</View>

				<Text style={{ ...styles.h2, marginTop: 30, marginBottom: 10 }}>
					Category
				</Text>
				<TouchableWithoutFeedback
					onPress={() => setPickerExpanded(true)}
				>
					<View>
						<Picker
							itemStyle={{
								...baseStyles.bold_p,
								height: getPickerHeight(pickerExpanded),
								backfaceVisibility: "hidden",
							}}
							selectedValue={selectedCategory}
							onValueChange={(itemValue, itemIndex) => {
								setSelectedCategory(itemValue);
								setPickerExpanded(false);
							}}
						>
							{Object.keys(activeCategories).map(
								(category, i) => {
									const categoryObj =
										activeCategories[category];
									return (
										<Picker.Item
											key={categoryObj.id}
											label={`${category} ${categoryObj.emoji}`}
											value={category}
										/>
									);
								}
							)}
						</Picker>
					</View>
				</TouchableWithoutFeedback>
				<View style={{ flexDirection: "col", alignItems: "left" }}>
					<Text
						style={{
							...styles.h2,
							marginTop: 30,
							marginBottom: 10,
						}}
					>
						Date
					</Text>
					<DateTimePicker
						value={date}
						mode="date"
						display="default"
						maximumDate={new Date()}
						onChange={(event, selectedDate) => {
							const currentDate = selectedDate || date;
							setDate(currentDate);
						}}
					/>
				</View>

				<RoundedButton
					enabled={amount > 0 && label !== ""}
					title="Save"
					backgroundColor={colors.blue}
					style={{ marginTop: 30 }}
					onPress={async () => {
						await addNewTransaction({
							id: uuid.v4(),
							amount: parseFloat(amount),
							label,
							category: selectedCategory,
							datetime: date.toISOString(),
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
