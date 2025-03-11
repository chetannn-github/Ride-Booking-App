import axios from "axios"
import { BASE_URL } from "./config"
import {tokenStorage} from "../store/storage"
import { logout } from "./authService";


export const appAxios = axios.create({
    baseURL:BASE_URL,
});

appAxios.interceptors.request.use(async (config)=>{
    const accessToken = tokenStorage.getString("access_token");
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

appAxios.interceptors.response.use((response)=> response,async (error) =>{
    if(error.response && error.response.status == 401){
        try{
            const newAccessToken = await refresh_tokens();
            if(newAccessToken){
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(error.config); 
            }
        }catch(error){
            console.log("Error in refreshing token");
        }
    }
    return Promise.reject(error);
})

export const refresh_tokens = async()=>{
    try {
        const refreshToken = tokenStorage.getString("refresh_token");
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`,{
            refreshToken : refreshToken
        });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        tokenStorage.set("access_token", newAccessToken);
        tokenStorage.set("refresh_token", newRefreshToken);
        return newAccessToken;
    } catch (error) {
        console.log("error in refreshing token");
        logout();
    }
}