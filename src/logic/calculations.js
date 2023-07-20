import AsyncStorage from '@react-native-async-storage/async-storage';

export async function totalEarnedThisMonth() {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        const currentMonth = new Date().getMonth();
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        let totalEarned = 0;
        transactions.map((transaction) => {
            const month = new Date(transaction['datetime']).getMonth();
            if (transaction['category']  === 'Income' && month === currentMonth) {
                totalEarned += transaction.amount;
            }
        });
        return totalEarned;
    } catch (error) {
        console.log(`ERROR IN totalEarnedThisMonth(): ${error}`);
    }
} 

export async function totalSpentThisMonth() {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        let totalSpent = 0;
        transactions.map((transaction) => {
            const month = new Date(transaction['datetime']).getMonth();
            const year = new Date(transaction['datetime']).getFullYear();
            if (transaction['category']  !== 'Income' && month === currentMonth && year === currentYear) {
                totalSpent += transaction.amount;
            }
        });
        return totalSpent;
    } catch (error) {
        console.log(`ERROR IN totalSpentThisMonth(): ${error}`);
    }
}

export async function totalSpentForCategory(category) {
    // Get all transactions and return an array, and catch errors
    try {
        let transactions = await AsyncStorage.getItem('transactions');
        if (!transactions) {
            transactions = [];
        } else {
            transactions = JSON.parse(transactions);
        }
        let totalEarned = 0;
        transactions.map((transaction) => {
            if (transaction['category']  === category) {
                totalEarned += transaction.amount;
            }
        });
        return totalEarned;
    } catch (error) {
        console.log(`ERROR IN totalEarnedForCategory(): ${error}`);
    }
}