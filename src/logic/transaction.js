import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addNewTransaction(transaction) {
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        transactions.push(transaction);
        AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        console.log(transactions);
    } catch (error) {
        console.log(`ERROR IN addNewTransaction(): ${error}`);
    }
}

export async function getAllTransactions() {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        return transactions;
    } catch (error) {
        console.log(`ERROR IN getAllTransactions(): ${error}`);
    }
}

export async function getTransactionsByCategory(category) {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        const filteredTransactions = transactions.filter((transaction) => {
            return transaction.category === category;
        });
        return filteredTransactions;
    } catch (error) {
        console.log(`ERROR IN getTransactionsByCategory(): ${error}`);
    }
}

export async function getTransactionsForMonth(month, year) {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionMonth = new Date(transaction.datetime).getMonth();
            const transactionYear = new Date(transaction.datetime).getFullYear();
            return transactionMonth === month && transactionYear === year;
        });
        return filteredTransactions;
    } catch (error) {
        console.log(`ERROR IN getTransactionsForMonth(): ${error}`);
    }
}