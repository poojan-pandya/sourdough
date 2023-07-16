import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getBudget(category) {
    try {
        let budgets = await AsyncStorage.getItem('budgets');
        if (!budgets) {
            return 0;
        } else {
            budgets = JSON.parse(budgets);
        }
        return budgets.hasOwnProperty(category) ? budgets[category] : 0;
    } catch (error) {
        console.log(`ERROR IN getBudget(): ${error}`);
    }
}

export async function updateBudget(category, budget) {
    try {
        let budgets = await AsyncStorage.getItem('budgets');
        if (!budgets) {
            budgets = {};
        } else {
            budgets = JSON.parse(budgets);
        }
        budgets[category] = budget;
        AsyncStorage.setItem('budgets', JSON.stringify(budgets));
    } catch (error) {
        console.log(`ERROR IN updateBudget(): ${error}`);
    }
}