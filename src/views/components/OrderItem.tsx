import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextView from './TextView'
import { TypeResponseOrder } from '../../types/types'
import { colorStatus, formatSide } from '../screens/RequestScreen';
import { formatPrice } from '../../utlis/Formats';

interface iOrderItem {
    data: TypeResponseOrder;
}
const OrderItem = ({data}: iOrderItem) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#202020", padding: 20, borderRadius: 20}}>
    <View>
    <TextView text={`ID: ${data.id}`} />
    <TextView text={`Operación: ${formatSide(data.side)}`} />
    <TextView text={`Tipo: ${data.type}`} />
    </View>
    <View style={{alignItems: 'flex-end'}}>
    <TextView text={`${data.status}`} color={colorStatus(data.status)} size={20}/>
    <TextView text={`${formatPrice(data.price)} x${data.quantity}`} />
    </View>
</View>
  )
}

export default OrderItem

const styles = StyleSheet.create({})