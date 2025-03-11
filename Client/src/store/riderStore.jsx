import {create} from "zustand"
import {createJSONStorage,persist} from "zustand/middleware"

import {mmkvStorage} from "./storage"

export const useRiderStore = create()(
    persist(
        (set) => ({
            user : null,
            location : null,
            onDuty : false,

            setUser : (data) => set({user: data}),
            setLocation : (data) => set({location : data}),
            setOnDuty : (data) => set({onDuty : data}),
            clearRiderData : () => set({user : null, location:null, onDuty : false}),

        }),
        {
            name: 'rider-storage',
            storage: createJSONStorage(() => mmkvStorage),
            partialize : (state) =>({
                user: state.user,
            })
        }
    ),
);