import React from 'react'
import {  Stack } from 'expo-router'
import {WSProvider} from "../service/WSProvider"
import {gestureHandlerRootHOC} from "react-native-gesture-handler"
import { StatusBar } from 'react-native'

const Layout = () => {
  return (
    <WSProvider>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name='rider'/>
        <Stack.Screen name='customer'/>
        
    
      </Stack>
    </WSProvider>
  )
}

export default gestureHandlerRootHOC(Layout);