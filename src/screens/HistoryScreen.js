import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { baseStyles } from '../styles/baseStyles'
import React, { useEffect, useState } from 'react'
import { getAllMonths, monthYearSplit } from '../logic/history'
import HistoryRow from '../components/HistoryRow'

const HistoryScreen = ({ navigation }) => {
    const [allMonths, setAllMonths] = useState([]);

    useFoucsEffect(React.useCallback(() => {
        getAllMonths().then((months) => {
            setAllMonths(months);
        }).catch((error) => {
            console.log(error);
        });
    }, []));

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>History</Text>
        <ScrollView>
            {allMonths.map((monthyear) => {
                const monthYearObj = monthYearSplit(monthyear);
                return (
                    <View key={monthyear}>
                        <HistoryRow month={parseInt(monthYearObj.month)} year={parseInt(monthYearObj.year)} onPress={() => {
                            navigation.navigate('History Month Screen', {month: parseInt(monthYearObj.month), year: parseInt(monthYearObj.year)});
                        }} />
                    </View>
                )
            })}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
    ...baseStyles
})