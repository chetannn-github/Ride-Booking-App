import {MMKV} from "react-native-mmkv"

export const tokenStorage = new MMKV({
    id:"token-storage",
    encryptionKey:"this is anything broo"
});

export const storage = new MMKV({
    id:"my-app-storage",
    encryptionKey:"this is anything broo",
})

export const mmkvStorage = {
    setItem : (key,value) =>{
        storage.set(key,value);
    },
    getItem : (key) =>{
        const val = storage.getString(key);
        return val?? null;
    },
    removeItem : (key) =>{
        storage.delete(key);
    }
}

