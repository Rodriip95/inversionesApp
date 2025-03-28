import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ActivosObjType, EnumTypeOperation, EnumTypeOrder } from '../../../types/types';
import useOrders from '../../../hooks/useOrders';
import TextView from '../TextView';
import { formatPrice } from '../../../utlis/Formats';

interface iDetailLimit {
  activo: ActivosObjType;
}

const DetailLimit = ({activo}:iDetailLimit) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [amount, setAmount] = useState<string>("0");
    const [focusable, setFocusable] = useState(false);
  
    const handleChangeText = (text: string) => {
      setAmount(text);
    };
  
    const handleChangePorcentaje = (porc: number) => {
      setPorcentaje(porc);
      if (activo.balance) {
        setAmount(`${activo.balance.valorMercado / porc}`);
      }
    };
  
    const { error, loading, sendOrder } = useOrders({
      onFinish: () => {},
    });
  
    return (
      <View>
        <TextView
          text="Elige un porcentaje"
          color="#aaa"
          styleText={{ marginBottom: 5 }}
        />
        <View style={styles.porcentajes}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  porcentaje === 4 ? "rgba(76, 211, 132, 0.8)" : "#252525",
              },
            ]}
            onPress={() => handleChangePorcentaje(4)}
          >
            <TextView text="25%" color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  porcentaje === 2 ? "rgba(76, 211, 132, 0.8)" : "#252525",
              },
            ]}
            onPress={() => handleChangePorcentaje(2)}
          >
            <TextView text="50%" color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  porcentaje === 1.333 ? "rgba(76, 211, 132, 0.8)" : "#252525",
              },
            ]}
            onPress={() => handleChangePorcentaje(1.333)}
          >
            <TextView text="75%" color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  porcentaje === 1 ? "rgba(76, 211, 132, 0.8)" : "#252525",
              },
            ]}
            onPress={() => handleChangePorcentaje(1)}
          >
            <TextView text="100%" color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 5, alignItems: "center" }}>
          <TextView text="o" color="#aaa" size={16} />
        </View>
        <View
          style={[
            styles.borders,
            { borderColor: focusable ? "rgb(76, 211, 132)" : "#aaa" },
          ]}
        >
          <TextView text="Ingresar inversión" color="#aaa" />
          <TextInput
            style={styles.textInput}
            onFocus={() => setFocusable(true)}
            value={amount}
            placeholder="$0.00"
            onChangeText={handleChangeText}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={10}
            placeholderTextColor={"#fff"}
          />
        </View>
  
        <View style={styles.row}>
          <TextView text="Total" color="#888" styleText={{ marginRight: 10 }} />
          <TextView text={`${formatPrice(amount)}`} color="#aaa" size={16} />
        </View>
  
        <View style={styles.row}>
          <TextView
            text="Cantidad"
            color="#888"
            styleText={{ marginRight: 10 }}
          />
          <TextView
            text={`x${
              Math.trunc(parseFloat(amount) / activo.last_price)
                ? Math.trunc(parseFloat(amount) / activo.last_price)
                : 0
            }`}
            color="#aaa"
            size={16}
          />
        </View>
  
        <View style={styles.rowEnd}>
          <TextView text="Balance" color="#888" styleText={{ marginRight: 10 }} />
          <TextView
            text={`${formatPrice(
                activo.balance && parseFloat(amount)
                ? activo.balance.valorMercado - parseFloat(amount)
                : activo.balance.valorMercado
            )}`}
            color="#aaa"
            size={16}
          />
        </View>
  
        <TouchableOpacity
          onPress={() =>
            sendOrder({
              instrument_id: activo.instrument_id,
              side: EnumTypeOrder.SELL,
              type: EnumTypeOperation.LIMIT,
              quantity: Math.trunc(parseFloat(amount) / activo.last_price),
              price: activo.last_price,
            })
          }
          style={[
            styles.btnBuy,
            {
              backgroundColor:
                parseFloat(amount) === 0 ||
                isNaN(parseFloat(amount)) ||
                !activo.balance ||
                activo.balance.valorMercado - parseFloat(amount) < 0 ||
                Math.trunc(parseFloat(amount) / activo.last_price) < 1
                  ? "#ccc"
                  : "#2e8a61",
            },
          ]}
          disabled={
            parseFloat(amount) === 0 ||
            isNaN(parseFloat(amount)) ||
            !activo.balance ||
            activo.balance.valorMercado - parseFloat(amount) < 0 ||
            Math.trunc(parseFloat(amount) / activo.last_price) < 1
          }
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <TextView text="Comprar" />
          )}
        </TouchableOpacity>
      </View>
    );
  };
    
  const styles = StyleSheet.create({
    porcentajes: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#888",
      width: Dimensions.get("screen").width / 6,
      paddingVertical: 5,
      alignItems: "center",
    },
    textInput: {
      width: "40%",
      textAlign: "right",
      color: '#fff'
    },
    borders: {
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    rowEnd: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    btnBuy: {
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      alignItems: "center",
    },
  });

export default DetailLimit

