import { ScrollView, StyleSheet, View } from 'react-native'
import { Heading, Text, VStack, Box } from 'native-base';
import React, { useState, useEffect } from 'react'
import { getAllTransactions } from '../logic/transaction'
import TransactionRow from '../components/TransactionRow';

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
    <Box safeArea m="5">
      <ScrollView>
      <VStack>
        <Heading size="2xl">This Week</Heading>
        <Text fontSize="xl">In: $0</Text>
        <Text fontSize="xl" pb="2">Out: $0</Text>
        <Heading size="2xl">All Transactions</Heading>
          {transactions.reverse().map((transaction) => {
            return (
              <View key={transaction.id}>
                <TransactionRow label={transaction.label} amount={transaction.amount} date={transaction.timestamp} />
              </View>
            )
          })}
      </VStack>
      </ScrollView>
    </Box>
  );
}

export default HomeScreen