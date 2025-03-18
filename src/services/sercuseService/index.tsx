import * as SecureStore from 'expo-secure-store';

export const SercuseService = {
    get: async (key: any) => {
        let result = await SecureStore.getItemAsync(key);
        console.log(`Retrieved ${key}:`, result); // Debug

        return result
    },
    set: async (key: any, value: any) => {
        await SecureStore.setItemAsync(key, value);
    }
}