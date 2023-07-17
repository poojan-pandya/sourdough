import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllCategories() {
    try {
        let categories = await AsyncStorage.getItem('categories');
        if (!categories) {
            categories = {
                'Income': {
                    'limit': 0,
                    'emoji': '🍞'
                },
            };
            AsyncStorage.setItem('categories', JSON.stringify(categories));
        } else {
            categories = JSON.parse(categories);
        }
        console.log(categories);
        return categories;
    } catch (error) {
        console.log(`ERROR IN getAllCategories(): ${error}`);
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
        };
        AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
        console.log(`ERROR IN addNewCategory(): ${error}`);
    }
}