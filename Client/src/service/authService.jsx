import {useUserStore} from "../store/userStore"
import {useRiderStore} from "../store/riderStore"
import { tokenStorage } from "../store/storage";
import { resetAndNavigate} from "../utils/Helpers"

export const logout = async() =>{
    const {clearData} = useUserStore.getState();
    const {clearRiderData} = useRiderStore.getState();

    tokenStorage.clearAll();
    clearData();
    clearRiderData();
    resetAndNavigate("/role");

}