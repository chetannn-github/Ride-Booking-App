import { View, Text } from 'react-native'
import React from 'react'
import {Link} from "expo-router"

const Home = () => {
  return (
    <View>
      <Text>Customer Home</Text>
      <Link href={"/rider/auth"}>go to rider auth</Link>
    </View>
  )
}

export default Home