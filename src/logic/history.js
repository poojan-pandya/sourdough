import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllTransactions } from "./transaction";
import { totalSpentForCategory } from "./calculations";

export async function getAllMonths() {
    try {
        let transactions = await getAllTransactions();
        const months = [];
        transactions.map((transaction) => {
            const month = new Date(transaction['datetime']).getMonth();
            const year = new Date(transaction['datetime']).getFullYear();
            const monthYear = `${month}/${year}`;
            if (!months.includes(monthYear)) {
                months.push(monthYear);
            }
        });
        return months;
    } catch {
        console.log(`ERROR IN getAllMonths(): ${error}`);
    }
}

export async function totalEarnedForMonth(month, year) {
    try {
        let transactions = await getAllTransactions();
        let totalEarned = 0;
        transactions.map((transaction) => {
            const transactionMonth = new Date(transaction['datetime']).getMonth();
            const transactionYear = new Date(transaction['datetime']).getFullYear();
            if (transaction['category']  === 'Income' && transactionMonth === month && transactionYear === year) {
                totalEarned += transaction.amount;
            }
        });
        return totalEarned;
    } catch {
        console.log(`ERROR IN totalEarnedForMonth(): ${error}`);
    }
}

export async function totalSpentForMonth(month, year) {
    try {
        let transactions = await getAllTransactions();
        let totalSpent = 0;
        transactions.map((transaction) => {
            const transactionMonth = new Date(transaction['datetime']).getMonth();
            const transactionYear = new Date(transaction['datetime']).getFullYear();
            if (transaction['category']  !== 'Income' && transactionMonth === month && transactionYear === year) {
                totalSpent += transaction.amount;
            }
        });
        return totalSpent;
    } catch {
        console.log(`ERROR IN totalSpentForMonth(): ${error}`);
    }
}

export async function totalSpentForCategoryForMonth(category, month, year) {
    try {
        let transactions = await getAllTransactions();
        let totalSpent = 0;
        transactions.map((transaction) => {
            const transactionMonth = new Date(transaction['datetime']).getMonth();
            const transactionYear = new Date(transaction['datetime']).getFullYear();
            if (transaction.category  === category && transactionMonth === month && transactionYear === year) {
                totalSpent += transaction.amount;
            }
        });
        return totalSpent;
    } catch {
        console.log(`ERROR IN totalSpentForCategoryForMonth(): ${error}`);
    }
}

export function monthYearSplit(monthYear) {
    const split = monthYear.split('/');
    return {
        month: split[0],
        year: split[1]
    }
}

export function monthYearToString(month, year) {
    const monthMap = new Map([
        [0, 'Jan'],
        [1, 'Feb'],
        [2, 'Mar'],
        [3, 'Apr'],
        [4, 'May'],
        [5, 'Jun'],
        [6, 'Jul'],
        [7, 'Aug'],
        [8, 'Sep'],
        [9, 'Oct'],
        [10, 'Nov'],
        [11, 'Dec']
      ]);
    return `${monthMap.get(month)} ${year}`;
}