import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addNewTransaction(transaction) {
	try {
		let transactions = await getAllTransactions();
		transactions.push(transaction);
		AsyncStorage.setItem("transactions", JSON.stringify(transactions));
	} catch (error) {
		console.log(`ERROR IN addNewTransaction(): ${error}`);
	}
}

export async function deleteTransaction(id) {
	try {
		let transactions = await getAllTransactions();
		transactions = transactions.filter((transaction) => {
			return transaction.id !== id;
		}
		);
		await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
		return transactions;
	} catch {
		console.log(`ERROR IN deleteTransaction(): ${error}`);
	}
}

export async function getAllTransactions() {
	try {
		let transactions = await AsyncStorage.getItem("transactions");
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
	try {
		let transactions = await getAllTransactions();
		const filteredTransactions = transactions.filter((transaction) => {
			return transaction.category === category;
		});
		return filteredTransactions;
	} catch (error) {
		console.log(`ERROR IN getTransactionsByCategory(): ${error}`);
	}
}

export async function getTransactionsByCategoryByMonth(category, month, year) {
	try {
		let transactions = await getAllTransactions();
		const filteredTransactions = transactions.filter((transaction) => {
			const transactionMonth = new Date(transaction.datetime).getMonth();
			const transactionYear = new Date(
				transaction.datetime
			).getFullYear();
			return (
				transaction.category === category &&
				transactionMonth === month &&
				transactionYear === year
			);
		});
		return filteredTransactions;
	} catch (error) {
		console.log(`ERROR IN getTransactionsByCategoryByMonth(): ${error}`);
	}
}

export async function getTransactionsForMonth(month, year) {
	try {
		let transactions = await getAllTransactions();
		const filteredTransactions = transactions.filter((transaction) => {
			const transactionMonth = new Date(transaction.datetime).getMonth();
			const transactionYear = new Date(
				transaction.datetime
			).getFullYear();
			return transactionMonth === month && transactionYear === year;
		});
		return filteredTransactions;
	} catch (error) {
		console.log(`ERROR IN getTransactionsForMonth(): ${error}`);
	}
}
