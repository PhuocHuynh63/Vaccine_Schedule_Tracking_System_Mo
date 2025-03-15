import * as SecureStore from 'expo-secure-store';

export const SercuseService = {
    get: async (key: any) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            alert('No values stored under that key.');
        }
    },
    set: async (key: any, value: any) => {
        await SecureStore.setItemAsync(key, value);
    }
}