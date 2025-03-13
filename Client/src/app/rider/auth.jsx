import { View, Text, SafeAreaView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { authStyles } from '@/styles/authStyles'
import { ScrollView } from 'react-native-gesture-handler'
import { commonStyles } from '@/styles/commonStyles'
import PhoneInput from "@/components/shared/PhoneInput"
import { useWS } from '@/service/WSProvider'
import CustomButton from "@/components/shared/CustomButton"
import { signin } from '@/service/authService'

const RiderAuth = () => {
  const {updateAccessToken} = useWS();
  const [phone,setPhone] = useState("");
  const [loading,setLoading] = useState(false);
  const [disabled,setDisabled] = useState(false);

  

  const handleNext = async()=>{
    try {
      if(disabled || loading){return;}
      if(phone.length !== 10){
        Alert.alert("buddy enter your phone number");
        return;
      }
      //api call kregee a
      setLoading(true);

      signin({role:'rider',phone},updateAccessToken)
      setLoading(false);
      
    } catch (error) {
      
    }
  }
  
  
  return (
   
      <ScrollView contentContainerStyle={{...authStyles.container}}>
        <View style={commonStyles.flexRowBetween}>
          <Image 
            style={authStyles.logo}
            source={require("@/assets/images/rider_logo.png")}
          />

        </View>

        <Text style={{fontSize:21,fontWeight:'700'}}>
          Good to see you rider!!
        </Text>
        <Text>
          Enter your mobile number to proceed.
        </Text>

        <PhoneInput value={phone} onChangeText={setPhone}/>


        <View style={authStyles.footerContainer}>
            <Text
              style={
                {...commonStyles.lightText,textAlign:"center"
              }}
            >
              By continuing, you agree to the terms and privacy policy.
            </Text>
            <CustomButton disabled={disabled} loading={loading} title={"Login"} onPress={handleNext}/>
        </View>
            
      




      </ScrollView>
    
    

  )
}

export default RiderAuth