import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { baseStyles, colors } from '../styles/baseStyles'
import CategoryRow from '../components/CategoryRow'
import { totalEarnedThisMonth, totalSpentForCategory, totalSpentThisMonth } from '../logic/calculations'
import { getAllCategories } from '../logic/categories'
import { useFocusEffect } from '@react-navigation/native'
import RoundedButton from '../components/RoundedButton'

const ThisMonthScreen = ({ navigation, route }) => {
    const [totalEarned, setTotalEarned] = useState(0);
    const [categories, setCategories] = useState({});
    const [totalSpent, setTotalSpent] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            totalEarnedThisMonth().then((total) => {
                setTotalEarned(total);
            }).catch((error) => {
                console.log(error);
            });

            totalSpentThisMonth().then((total) => {
                setTotalSpent(total);
            }).catch((error) => {
                console.log(error);
            });

            getAllCategories().then((categories) => {
                setCategories(categories);
                console.log(categories);
            }).catch((error) => {
                console.log(error);
            });
        }, [])
    )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>This Month</Text>
      {/* <Text style={styles.h2}><Text style={styles.h1}>🍞</Text> ${totalEarned.toFixed(2)} earned</Text> */}
      <Text style={styles.h2}><Text style={styles.h1}>🛍</Text> ${totalSpent.toFixed(2)} spent</Text>
      <View style={{flexDirection: "row-reverse"}}>
        <RoundedButton style={{marginTop: 20, width: "50%"}} enabled={true} title="New Category" backgroundColor={colors.blue} onPress={() => {
            navigation.navigate('New Category Screen');
        } } />
      </View>
      <ScrollView style={{marginTop:20}}>
            {Object.keys(categories).map((category, i) => {
                const categoryObj = categories[category];
                return (
                    <View key={i}>
                        <CategoryRow
                            text={category}
                            limit={categoryObj.limit}
                            emoji={categoryObj.emoji}
                            onPress={() => {
                                navigation.navigate('Category Screen', {category: category});
                            }}
                        />
                    </View>
                )
            })}
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default ThisMonthScreen;

const styles = StyleSheet.create({
    ...baseStyles,
})