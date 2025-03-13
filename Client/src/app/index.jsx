import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';

import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import { Link } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { tokenStorage } from '@/store/storage';
import { jwtDecode } from "jwt-decode";
import { resetAndNavigate } from '@/utils/Helpers';
import { refresh_tokens } from '@/service/apiInterceptor';

const Main = () => {
  const [loaded, error] = useFonts({
    'Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
    'Light': require('../assets/fonts/NotoSans-Light.ttf'),
    'Medium': require('../assets/fonts/NotoSans-Medium.ttf'),
    'Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'SemiBold': require('../assets/fonts/NotoSans-SemiBold.ttf'),
  });

  const {user} = useUserStore();
  const [hasNavigated,setHasNavigated] = useState(false);

  // console.log(user);
  
  const tokenCheck = async() =>{
    const accessToken = tokenStorage.getString("access_token");
    const refreshToken = tokenStorage.getString("refresh_token");

   
    // console.log(accessToken)
    if(accessToken){
      
      const decodedAccessToken = jwtDecode(accessToken);
      const decodedRefreshToken = jwtDecode(refreshToken);
      
     

      const currentTime = Date.now()/1000;
 console.log(currentTime)
      if(decodedRefreshToken?.exp < currentTime){
        resetAndNavigate("/role");
        Alert.alert("Session expired, please login again");
      }

      if(decodedAccessToken?.exp < currentTime){
        try {
          refresh_tokens();
        } catch (error) {
          console.log(err);
          Alert.alert("refresh token error");
        }
      }
      // console.log(user);
      if(user){
        resetAndNavigate("/customer/home");
      }else{
        resetAndNavigate("/rider/home");
      }
      return;
      
    }

    resetAndNavigate('/role');
  }
  
  useEffect(()=>{
    if(loaded && !hasNavigated){
      const timeoutId = setTimeout(()=>{
        tokenCheck();
        setHasNavigated(true);
      },1000);
      return ()=> clearTimeout(timeoutId);
    }
  },[loaded,hasNavigated]);
  
  return (
    <View style={commonStyles.container}>
      <Image style={splashStyles.img} source={require("@/assets/images/logo_t.png")}></Image>
      <Link href={"/role"}> Go to role</Link>
    </View>
  )
}

export default Main