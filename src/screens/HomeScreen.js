import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { getAllTransactions } from '../logic/transaction'

const HomeScreen = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getAllTransactions().then((value) => {
      setTransactions(value);
    }).catch((error) => {
      console.log(error);
    });
  });
  return (
    <View>
      <Text variant='displayLarge'>This Week</Text>
      <Text variant='displaySmall'>$XX.xx in</Text>
      <Text variant='displaySmall'>$XX.xx out</Text>
      <Text variant='displayLarge'>Transactions</Text>
      <ScrollView>
        {transactions.map((transaction) => {
          return (
            <View key={transaction.id}>
              <Text>${transaction.amount} for {transaction.label}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  basic : { flex: 1, alignItems: 'center', justifyContent: 'center' }
})

export default HomeScreen