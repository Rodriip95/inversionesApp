import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextView from './TextView'

const ErrorMsg = () => {
  return (
    <View style={styles.container}>
      <TextView text='Hubo un problema, intentalo más tarde.' />
    </View>
  )
}

export default ErrorMsg

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
      },
})