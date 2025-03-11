import {create} from "zustand"
import {createJSONStorage,persist} from "zustand/middleware"

import {mmkvStorage} from "./storage"

export const useUserStore = create()(
    persist(
        (set) => ({
            user : null,
            location : null,
            outOfRange : false,

            setUser : (data) => set({user: data}),
            setLocation : (data) => set({location : data}),
            setOutOfRange : (data) => set({outOfRange : data}),
            clearData : (data) => set({user : null, location:null, outOfRange : false}),

        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => mmkvStorage),
            partialize : (state) =>({
                user: state.user,
            })
        }
    ),
);