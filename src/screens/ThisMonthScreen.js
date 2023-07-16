import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { baseStyles, colors } from '../styles/baseStyles'
import CategoryRow from '../components/CategoryRow'
import { totalEarnedThisMonth, totalSpentThisMonth } from '../logic/calculations'
import { useFocusEffect } from '@react-navigation/native'
import RoundedButton from '../components/RoundedButton'

const ThisMonthScreen = ({ navigation, route }) => {
    const [totalEarned, setTotalEarned] = useState(0);
    useFocusEffect(() => {
        totalEarnedThisMonth().then((total) => {
            setTotalEarned(total);
        }).catch((error) => {
            console.log(error);
        });
    })

    const [totalSpent, setTotalSpent] = useState(0);
    useFocusEffect(() => {
        totalSpentThisMonth().then((total) => {
            setTotalSpent(total);
        }).catch((error) => {
            console.log(error);
        });
    })
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>This Month</Text>
      <Text style={styles.h2}><Text style={styles.h1}>🍞</Text> ${totalEarned.toFixed(2)} earned</Text>
      <Text style={styles.h2}><Text style={styles.h1}>🛍</Text> ${totalSpent.toFixed(2)} spent</Text>
      <View style={{flexDirection: "row-reverse"}}>
        <RoundedButton style={{marginTop: 20, width: "50%"}} enabled={true} title="New Category" backgroundColor={colors.blue} onPress={() => {
            navigation.navigate('New Category Screen');
        } } />
      </View>
      <ScrollView style={{paddingTop:20}}>
            <CategoryRow text="Groceries" amount={432} limit={500} emoji="🌮" onPress={() => {
                navigation.navigate('Category Screen', {category: "Groceries"});
            }}/>
            <CategoryRow text="Entertainment" amount={432} limit={500} emoji="🍿" />
            <CategoryRow text="Utilities" amount={432} limit={500} emoji="💡" />
            <CategoryRow text="Rent" amount={432} limit={500} emoji="🏠" />
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default ThisMonthScreen;

const styles = StyleSheet.create({
    ...baseStyles,
})