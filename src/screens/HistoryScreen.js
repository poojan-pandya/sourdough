import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { baseStyles, colors } from "../styles/baseStyles";
import React, { useState } from "react";
import { getAllMonths, monthYearSplit } from "../logic/history";
import HistoryRow from "../components/HistoryRow";
import { useFocusEffect } from "@react-navigation/native";

const monthYearSort = (a, b) => {
	const aObj = monthYearSplit(a);
	const bObj = monthYearSplit(b);
	if (aObj.year > bObj.year) {
		return -1;
	} else if (aObj.year < bObj.year) {
		return 1;
	} else {
		if (aObj.month > bObj.month) {
			return -1;
		} else if (aObj.month < bObj.month) {
			return 1;
		} else {
			return 0;
		}
	}
};

const HistoryScreen = ({ navigation }) => {
	const [allMonths, setAllMonths] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
			getAllMonths()
				.then((months) => {
					months.sort(monthYearSort);
					setAllMonths(months);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [])
	);

	if (allMonths.length === 0) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.h1}>History</Text>
				<Text
					style={{ ...styles.h2, color: colors.gray, marginTop: 10 }}
				>
					None right now!
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.h1}>History</Text>
			<ScrollView>
				{allMonths.map((monthyear) => {
					const monthYearObj = monthYearSplit(monthyear);
					return (
						<View key={monthyear}>
							<HistoryRow
								month={parseInt(monthYearObj.month)}
								year={parseInt(monthYearObj.year)}
								onPress={() => {
									navigation.navigate(
										"History Month Screen",
										{
											month: parseInt(monthYearObj.month),
											year: parseInt(monthYearObj.year),
										}
									);
								}}
							/>
						</View>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
	...baseStyles,
});
