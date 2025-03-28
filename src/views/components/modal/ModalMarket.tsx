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
import { iBalance } from "../../../hooks/usePortfolio";
import {
  ActivosObjType,
  EnumTypeOperation,
  EnumTypeOrder,
  InstrumentObjType,
} from "../../../types/types";
import useOrders from "../../../hooks/useOrders";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface iModalMarket {
  focusable: boolean;
  setFocusable: (boolean: boolean) => void;
  quantity: string;
  handleChangeText: (text: string) => void;
  content: InstrumentObjType;
  balances: iBalance | undefined;
  onClose: () => void;
}

const ModalMarket = ({
  focusable,
  setFocusable,
  quantity,
  handleChangeText,
  content,
  balances,
  onClose,
}: iModalMarket) => {
  const { error, loading, sendOrder } = useOrders({
    onFinish: onClose,
  });

  return (
    <View>
      <View
        style={[
          styles.borders,
          { borderColor: focusable ? "rgb(76, 211, 132)" : "#aaa" },
        ]}
      >
        <TextView text="Cantidad a comprar" color="#000" />
        <TextInput
          style={styles.textInput}
          onFocus={() => setFocusable(true)}
          value={quantity}
          placeholder="0"
          onChangeText={handleChangeText}
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.row}>
        <TextView
          text="Total a pagar"
          color="#888"
          styleText={{ marginRight: 10 }}
        />
        <TextView
          text={`${formatPrice(
            parseInt(quantity) ? content.last_price * parseInt(quantity) : 0
          )}`}
          color="#000"
          size={16}
        />
      </View>
      <View style={styles.rowEnd}>
        <TextView text="Balance" color="#888" styleText={{ marginRight: 10 }} />
        <TextView
          text={`${formatPrice(
            balances
              ? balances.balanceTotal -
                  content.last_price *
                    (parseInt(quantity) ? parseInt(quantity) : 0)
              : 0
          )}`}
          color="#000"
          size={16}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          sendOrder({
            instrument_id: content.id,
            side: EnumTypeOrder.BUY,
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
              !balances ||
              balances.balanceTotal - content.last_price * parseInt(quantity) <
                0
                ? "#ccc"
                : "#2e8a61",
          },
        ]}
        disabled={
          parseInt(quantity) === 0 ||
          isNaN(parseFloat(quantity)) ||
          !balances ||
          balances.balanceTotal - content.last_price * parseInt(quantity) < 0 ||
          loading
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

export default ModalMarket;

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
  btn: {
    backgroundColor: "#2e8a61",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
});
