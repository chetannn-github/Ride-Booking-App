import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <View>
      <Text>AuthLayout</Text>
      <Slot/>
    </View>
  )
}

export default AuthLayout