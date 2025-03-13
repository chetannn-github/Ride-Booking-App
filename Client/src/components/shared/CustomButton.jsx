import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Constants'

const CustomButton = ({title,onPress,loading,disabled}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{...styles.container,backgroundColor : disabled ? Colors.secondary : Colors.primary}}

    >
        {loading ? <ActivityIndicator color={Colors.text} size={"small"}/> :
            (
                <Text 
                    style = {{
                        color:disabled ? "#fff":Colors.text,
                        fontSize:12,
                        textAlign:"center"

                    }}
                >
                    {title}
                </Text>
            )
        
        }


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        backgroundColor:"red",
        height:45,
        alignContent:"center",
        justifyContent:"center",
        width:"100%"
    }
})

export default CustomButton