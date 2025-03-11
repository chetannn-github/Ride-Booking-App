import { View, Text, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import { Link } from 'expo-router';

const Main = () => {
  const [loaded, error] = useFonts({
    'Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
    'Light': require('../assets/fonts/NotoSans-Light.ttf'),
    'Medium': require('../assets/fonts/NotoSans-Medium.ttf'),
    'Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'SemiBold': require('../assets/fonts/NotoSans-SemiBold.ttf'),
  });

  
  return (
    <View style={commonStyles.container}>
      <Image style={splashStyles.img} source={require("@/assets/images/logo_t.png")}></Image>
      <Link href={"/role"}> Go to role</Link>
    </View>
  )
}

export default Main