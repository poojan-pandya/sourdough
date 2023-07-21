import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { getAllTransactions, getTransactionsForMonth } from './transaction';

export async function getAllCategories() {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {
                'Income': {
                    'limit': 0,
                    'emoji': '🍞',
                    'id': uuid.v4(),
                },
            };
            AsyncStorage.setItem('categories', JSON.stringify(categories));
        } else {
            categories = JSON.parse(categories);
        }
        return categories;
    } catch (error) {
        console.log(`ERROR IN getAllCategories(): ${error}`);
    }
}

export async function getAllCategoriesForMonth(month, year) {
    try {
        let [transactions, categories] = await Promise.all([
            getTransactionsForMonth(month, year),
            getAllCategories(),
        ]);
        console.log('categories', categories);
        console.log('filtered transactions', transactions);
        const categoryNames = [];
        for (let i = 0; i < transactions.length; i++) {
            if (!categoryNames.includes(transactions[i].category)) {
                categoryNames.push(transactions[i].category);
            }
        }
        console.log('category names', categoryNames);
        let filteredCategories = {};
        for (const key in categories) {
            if (categoryNames.includes(key)) {
                filteredCategories[key] = categories[key];
            }
        }
        console.log('filteredCategories', filteredCategories);
        return filteredCategories;
    } catch (error) {
        console.log(`ERROR IN getAllCategoriesForMonth(): ${error}`);
    }
}




export async function isDuplicateCategory(name, emoji) {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {};
        } else {
            categories = JSON.parse(categories);
        }
        if (categories.hasOwnProperty(name)) {
            return true;
        }
        for (const key in categories) {
            if (categories[key].emoji === emoji) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log(`ERROR IN isDuplicateCategory(): ${error}`);
    }
}

export async function addNewCategory(name, limit, emoji) {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {};
        } else {
            categories = JSON.parse(categories);
        }
        categories[name] = {
            limit: limit,
            emoji: emoji,
            id: uuid.v4(),
        };
        AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
        console.log(`ERROR IN addNewCategory(): ${error}`);
    }
}

export async function getCategoryInfo(category) {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {};
        } else {
            categories = JSON.parse(categories);
        }
        return categories[category];
    } catch (error) {
        console.log(`ERROR IN getLimitForCategory(): ${error}`);
    }
}

export async function setCategoryLimit(category, limit) {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {};
        } else {
            categories = JSON.parse(categories);
        }
        categories[category].limit = limit;
        AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
        console.log(`ERROR IN setCategoryLimit(): ${error}`);
    }
}

export async function setCategoryEmoji(category, emoji) {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {};
        } else {
            categories = JSON.parse(categories);
        }
        categories[category].emoji = emoji;
        AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
        console.log(`ERROR IN setCategoryEmoji(): ${error}`);
    }
}