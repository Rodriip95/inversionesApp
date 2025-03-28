import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TextView from "../TextView";
import { formatPrice } from "../../../utlis/Formats";
import {
  ActivosObjType,
  EnumTypeOperation,
  EnumTypeOrder,
} from "../../../types/types";
import useOrders from "../../../hooks/useOrders";

interface iDetailMarket {
  focusable: boolean;
  setFocusable: (boolean: boolean) => void;
  quantity: string;
  handleChangeText: (text: string) => void;
  activo: ActivosObjType;
}

const DetailMarket = ({
  quantity,
  handleChangeText,
  focusable,
  setFocusable,
  activo,
}: iDetailMarket) => {
  const { error, loading, sendOrder } = useOrders({
    onFinish: () => {},
  });

  return (
    <View>
      <View
        style={[
          styles.borders,
          { borderColor: focusable ? "rgb(76, 211, 132)" : "#fff" },
        ]}
      >
        <TextView text="Cantidad a vender" color="#fff" />
        <TextInput
          style={styles.textInput}
          onFocus={() => setFocusable(true)}
          value={quantity}
          placeholder="0"
          placeholderTextColor={"#fff"}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={10}
        />
      </View>

      <View style={styles.row}>
        <TextView
          text="Total a pagar"
          color="#aaa"
          styleText={{ marginRight: 10 }}
        />
        <TextView
          text={`${formatPrice(
            parseInt(quantity) ? activo.last_price * parseInt(quantity) : 0
          )}`}
          color="#fff"
          size={16}
        />
      </View>
      <View style={styles.row}>
        <TextView text="Balance" color="#aaa" styleText={{ marginRight: 10 }} />
        <TextView
          text={`${formatPrice(
            activo.balance
              ? activo.balance.valorMercado -
                  activo.last_price *
                    (parseInt(quantity) ? parseInt(quantity) : 0)
              : 0
          )}`}
          color="#fff"
          size={16}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          sendOrder({
            instrument_id: activo.instrument_id,
            side: EnumTypeOrder.SELL,
            type: EnumTypeOperation.MARKET,
            quantity: parseInt(quantity),
          })
        }
        style={[
          styles.btn,
          {
            backgroundColor:
              parseInt(quantity) === 0 ||
              isNaN(parseFloat(quantity)) ||
              !activo ||
              activo.balance.valorMercado -
                activo.last_price * parseInt(quantity) <
                0
                ? "#ccc"
                : "#2e8a61",
          },
        ]}
        disabled={
          parseInt(quantity) === 0 ||
          isNaN(parseFloat(quantity)) ||
          !activo ||
          activo.balance.valorMercado - activo.last_price * parseInt(quantity) <
            0 ||
          loading
        }
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"#fff"} />
        ) : (
          <TextView text="Vender" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DetailMarket;

const styles = StyleSheet.create({
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
  textInput: {
    width: "40%",
    textAlign: "right",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#2e8a61",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
});
