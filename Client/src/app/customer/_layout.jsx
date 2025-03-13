import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import {commonStyles} from "../../styles/commonStyles"

const CustomerLayout = () => {
  return (
    <SafeAreaView style={commonStyles.containerBlack}>
       <Slot/>
    </SafeAreaView>
    
     
    
  )
}

export default CustomerLayout