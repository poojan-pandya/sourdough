import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { baseStyles, colors, padding } from '../styles/baseStyles'
import React from 'react'
import { totalEarnedThisMonth, totalSpentForCategory } from '../logic/calculations'
import { useFocusEffect } from '@react-navigation/native'
import { totalEarnedForMonth, totalSpentForCategoryForMonth } from '../logic/history'

const HistoryCategoryRow = ({ text, month, year, emoji }) => {

    if (text === "Income") {
        const [amount, setAmount] = React.useState(0);
        useFocusEffect(React.useCallback(() => {
            totalEarnedForMonth(month, year).then((total) => {
                setAmount(total);
            }).catch((error) => {
                console.log(error);
            });
        }, []));
        return (
            <View style={{...styles.card, backgroundColor: colors.lightGreen}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', height:60}}>
                        <Text style={styles.bold_p}>{text}</Text>
                        <Text style={{...styles.bold_p}}>${amount}</Text>
                    </View>
                    <View style={{flexDirection: 'col', justifyContent: "center"}}>
                        <Text style={styles.h1}>{emoji}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const [amount, setAmount] = React.useState(0);

    useFocusEffect(React.useCallback(() => {
        totalSpentForCategoryForMonth(text, month, year).then((total) => {
            setAmount(total);
        }).catch((error) => {
            console.log(error);
        });
    }, []));

  return (
            <View style={{...styles.card, backgroundColor: colors.lightGray}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', height:60}}>
                        <Text style={styles.bold_p}>{text}</Text>
                        <Text style={{...styles.bold_p}}>${amount}</Text>
                    </View>
                    <View style={{flexDirection: 'col', justifyContent: "center"}}>
                        <Text style={styles.h1}>{emoji}</Text>
                    </View>
                </View>
            </View>
  )
}

export default HistoryCategoryRow

const styles = StyleSheet.create({
    ...baseStyles,
    card: {
        backgroundColor: colors.lightGray,
        padding: padding.sm,
        borderRadius: 10,
        marginBottom: 10,
        height: 80
    }
})