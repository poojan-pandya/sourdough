import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { baseStyles } from '../styles/baseStyles'
import { monthYearToString } from '../logic/history'
import { useFocusEffect } from '@react-navigation/native'
import { getAllCategories } from '../logic/categories'
import CategoryRow from '../components/CategoryRow'

const HistoryMonthScreen = ({ navigation, route }) => {

    const [categories, setCategories] = useState({});
    useFocusEffect(React.useCallback(() => {
        getAllCategories().then((categories) => {
            setCategories(categories);
            console.log(categories);
        }).catch((error) => {
            console.log(error);
        });
    }, []));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>{monthYearToString(route.params.month, route.params.year)}</Text>

      <ScrollView style={{marginTop:20}}>
            {Object.keys(categories).map((category, i) => {
                const categoryObj = categories[category];
                return (
                    <View key={i}>
                        <CategoryRow
                            text={category}
                            limit={categoryObj.limit}
                            emoji={categoryObj.emoji}
                            onPress={category !== "Income" ? () => {
                                navigation.navigate('Category Screen', {category: category});
                            } : () => {}}
                        />
                    </View>
                )
            })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryMonthScreen

const styles = StyleSheet.create({
    ...baseStyles
})