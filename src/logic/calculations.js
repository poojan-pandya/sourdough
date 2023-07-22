import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTransactions, getTransactionsByCategoryByMonth, getTransactionsForMonth } from './transaction';

export async function totalEarnedThisMonth() {
    try {
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let transactions = await getTransactionsByCategoryByMonth("Income", month, year);
        let totalEarned = 0;
        transactions.map((transaction) => {
            totalEarned += transaction.amount;
        }
        );
        return totalEarned;
    } catch {
        console.log(`ERROR IN totalEarnedThisMonth(): ${error}`);
    }
} 

export async function totalSpentThisMonth() {
    // Get all transactions and return an array, and catch errors
    try {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const transactions = await getTransactionsForMonth(month, year);
        let totalSpent = 0;
        transactions.map((transaction) => {
            if (transaction.category !== "Income") {
                totalSpent += transaction.amount;
            }
        });
        return totalSpent;
    } catch (error) {
        console.log(`ERROR IN totalSpentThisMonth(): ${error}`);
    }
}