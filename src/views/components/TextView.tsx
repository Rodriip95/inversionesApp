import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface iTextView {
    text: string;
    size?: number;
    color?: string;
    styleText?: StyleProp<ViewStyle>
    semiBold?: boolean;
}

const TextView = ({text, size = 14, color = "#fff", styleText, semiBold}: iTextView) => {
    const styles = StyleSheet.create({
        textBalance: {
            fontSize: size,
            color: color,
            fontFamily: semiBold ? 'Poppins-SemiBold' : 'Poppins-Regular',
        }
    })
  return (
      <Text style={[styles.textBalance, styleText]}>{text}</Text>
  )
}

export default TextView
