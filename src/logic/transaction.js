import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addNewTransaction(transaction) {
    // Get the current list of transactions from AsyncStorage
    AsyncStorage.getItem('transactions').then((value) => {
        let transactions = JSON.parse(value);
        // If there are no transactions, create an empty array
        if (transactions === null || transactions === undefined) {
            transactions = [];
        }
        // Add the new transaction to the array
        transactions.push(transaction);
        // Save the array back to AsyncStorage
        AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        console.log(transactions);
    }).catch((error) => {
        console.log(error);
    });
}

export async function getAllTransactions() {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (transactions === null) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        return transactions;
    } catch (error) {
        console.log(`ERROR IN GETALLTRANSACTIONS: ${error}`);
    }
}