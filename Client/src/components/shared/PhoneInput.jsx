import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const PhoneInput = ({value,onChangeText,onBlur,onFocus}) => {
    

  return (
    <View style ={styles.container}>
        <Text style={styles.text}>
            +91
        </Text>
        <TextInput 
            placeholder='XXXX - XXXX - XXXX'
            placeholderTextColor={"#ccc"}
            keyboardType='phone-pad'
            value={value}
            maxLength={10}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            style= {styles.input}
        >

        </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems: "center",
        gap:4,
        marginVertical:15,
        borderWidth:1,
        paddingHorizontal:10,
        
    },
    input :{
        height:45,
        width:"90%",
        fontFamily:"Medium",
        fontSize: 17
    },
    text:{
        fontFamily:"Medium",
        fontSize: 17,
        textAlign:'center',
        
    }
})

export default PhoneInput