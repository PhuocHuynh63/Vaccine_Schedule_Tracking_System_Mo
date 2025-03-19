import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageService = {
    getUserId: async (key: any) => {
        let result = await AsyncStorage.getItem(key);
        return result
    },
    setUserId: async (key: any, value: any) => {
        await AsyncStorage.setItem(key, value);
    },
    removeUserId: async (key: any) => {
        await AsyncStorage.removeItem(key);
    },
}