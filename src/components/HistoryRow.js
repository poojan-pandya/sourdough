import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { monthYearToString, totalEarnedForMonth, totalSpentForMonth } from '../logic/history';
import { baseStyles, colors, padding } from '../styles/baseStyles';
import { useFocusEffect } from '@react-navigation/native';

const HistoryRow = ({ month, year, onPress }) => {
    const [totalEarned, setTotalEarned] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    useFocusEffect(React.useCallback(() => {
        totalEarnedForMonth(month, year).then((total) => {
            setTotalEarned(total);
        }).catch((error) => {
            console.log(error);
        });
        totalSpentForMonth(month, year).then((total) => {
            setTotalSpent(total);
        }).catch((error) => {
            console.log(error);
        });
    }, []));

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{...styles.card, marginTop: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', height:60}}>
                        <Text style={styles.h2}>{monthYearToString(month, year)}</Text>
                    </View>
                    <View style={{flexDirection: 'col', justifyContent: "space-around", alignItems: "flex-end"}}>
                        <Text style={{...styles.bold_p, color: colors.green}}>{`$${totalEarned.toFixed(2)} earned`}</Text>
                        <Text style={{...styles.bold_p, color: colors.red}}>{`$${totalSpent.toFixed(2)} spent`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HistoryRow

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