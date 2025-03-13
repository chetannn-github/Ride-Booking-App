import {useUserStore} from "../store/userStore"
import {useRiderStore} from "../store/riderStore"
import { tokenStorage } from "../store/storage";
import { resetAndNavigate} from "../utils/Helpers"
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "./config";

export const logout = async(disconnect) =>{
    const {clearData} = useUserStore.getState();
    const {clearRiderData} = useRiderStore.getState();

    if(disconnect) disconnect();
    
    tokenStorage.clearAll();
    clearData();
    clearRiderData();
    resetAndNavigate("/role");

}


export const signin = async(payload,updateAccessToken) =>{
    const {setUser} = useUserStore.getState();
    const {setUser : setRiderUser} = useRiderStore.getState();

    try {
        const res = await axios.post(`${BASE_URL}/auth/signin`,payload);

        if(res.data.user.role == "customer"){
            setUser(res.data.user);
        }else{
            setRiderUser(res.data.user);
        }

        tokenStorage.set("access_token", res.data.access_token);
        tokenStorage.set("refresh_token", res.data.refresh_token);

        if(res.data.user.role == "customer"){
            resetAndNavigate("/customer/home")
        }else{
            resetAndNavigate("/rider/home")
        }
        updateAccessToken();
    } catch (error) {
        Alert.alert("error in signin");
    }
}