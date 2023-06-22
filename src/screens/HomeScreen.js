import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { getAllTransactions } from '../logic/transaction'

const HomeScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text variant='displayLarge'>This Week</Text>
      <Text variant='displaySmall'>$XX.xx in</Text>
      <Text variant='displaySmall'>$XX.xx out</Text>
      <Text variant='displayLarge'>Transactions</Text>
      <ScrollView>
        {/* This is where the transactions will go */}
        transactions = getAllTransactions();
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  basic : { flex: 1, alignItems: 'center', justifyContent: 'center' }
})

export default HomeScreen