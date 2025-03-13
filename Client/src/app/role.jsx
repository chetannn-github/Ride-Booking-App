import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { roleStyles } from '@/styles/roleStyles'

const Role = () => {
  const handleCustomerPress = () =>{
    router.navigate("/customer/auth")
  }
  const handleRiderPress = () =>{
    router.navigate("/rider/auth")
  }
  return (
    <View style={roleStyles.container}>
        <Image style={roleStyles.logo} source={require("@/assets/images/logo_t.png")}/>
        <Text>Choose your role</Text>

        <TouchableOpacity style={roleStyles.card} onPress={handleCustomerPress}>
          <Image 
            style={roleStyles.image}
            source={require("@/assets/images/customer.jpg")}>

          </Image>

          <View style={roleStyles.cardContent}>
            <Text style={roleStyles.title}>Customer</Text>
            <Text style={roleStyles.description}>
              Are you a customer ? Order rides and deliveries easily with our app.
            </Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity TouchableOpacity style={roleStyles.card} onPress={handleRiderPress}>
          <Image 
            style={roleStyles.image}
            source={require("@/assets/images/rider.jpg")}>

          </Image>

          <View style={roleStyles.cardContent}>
            <Text style={roleStyles.title}>Rider</Text>
            <Text style={roleStyles.description}>
              Are you a rider ? Join us to drive and deliver
            </Text>
          </View>

        </TouchableOpacity>
    </View>
  )
}

export default Role