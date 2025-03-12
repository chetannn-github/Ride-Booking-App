import { createContext, useContext, useEffect, useRef, useState } from "react";
import {tokenStorage} from "../store/storage"
import { io} from "socket.io-client";
import { SOCKET_URL } from "./config";
import { refresh_tokens } from "./apiInterceptor";

const WSContext = createContext();

export const WSProvider = ({children}) =>{
    const [socketAccessToken,setSocketAccessToken] = useState(null);
    const socket = useRef();

    useEffect(()=>{
        const token = tokenStorage.getString("access_token");
        setSocketAccessToken(token);
    },[]);

    // socket connection establish krne ke liyee 
    useEffect(()=>{
        if(socketAccessToken){
            if(socket.current){
                socket.current.disconnect();
            }

            socket.current = io(SOCKET_URL,{
                transports :["websocket"],
                withCredentials: true,
                extraHeaders:{
                    access_token : socketAccessToken || "",
                }
            });

            socket.current.on("connect_error", (error) =>{
                if(error.message === "Authentication error"){
                    console.log("Auth connection error" , error.message);
                    refresh_tokens();
                }
            })

        }
        return ()=>{
            socket.current?.disconnect();
        }
    },[socketAccessToken])


    const on = (event,cb) =>{
        socket.current?.emit(event,cb);
    }

    const emit = (event,data) =>{
        socket.current?.emit(event,data);
    }

    const off = (event) =>{
        socket.current?.off(event);
    }

    const removeListener = (listenerName) =>{
        socket?.current?.removeListener(listenerName);
    }

    const disconnect = () =>{
        if(socket.current){
            socket.current.disconnect();
            socket.current = undefined;
        }
    }

    const updateAccessToken = () =>{
        const token = tokenStorage.getString("access_token");
        setSocketAccessToken(token);
    }

    const socketService = {
        intializeSocket : () =>{},
        emit,off,on,removeListener,disconnect,updateAccessToken
    }


    return (
        <WSContext.Provider value={socketService}>{children}</WSContext.Provider>
    )
}


export const useWS = ()=>{
    const socketService = useContext(WSContext);
    if(!socketService){
        throw new Error ("use WS must be in WS Provider");
    }
    return socketService;
}