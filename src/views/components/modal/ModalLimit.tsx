import {
  ActivityIndicator,
  Dimensions,
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

interface iModalLimit {
  balances: iBalance | undefined;
  content: InstrumentObjType;
  onClose: () => void;
}

const ModalLimit = ({ balances, content, onClose }: iModalLimit) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [amount, setAmount] = useState<string>("0");
  const [focusable, setFocusable] = useState(false);

  const handleChangeText = (text: string) => {
    setAmount(text);
  };

  const handleChangePorcentaje = (porc: number) => {
    setPorcentaje(porc);
    if (balances) {
      setAmount(`${balances.balanceTotal / porc}`);
    }
  };

  const { error, loading, sendOrder } = useOrders({
    onFinish: onClose,
  });

  return (
    <View>
      <TextView
        text="Elige un porcentaje"
        color="#000"
        styleText={{ marginBottom: 5 }}
      />
      <View style={styles.porcentajes}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                porcentaje === 4 ? "rgba(76, 211, 132, 0.8)" : "#fff",
            },
          ]}
          onPress={() => handleChangePorcentaje(4)}
        >
          <TextView text="25%" color="#444" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                porcentaje === 2 ? "rgba(76, 211, 132, 0.8)" : "#fff",
            },
          ]}
          onPress={() => handleChangePorcentaje(2)}
        >
          <TextView text="50%" color="#444" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                porcentaje === 1.333 ? "rgba(76, 211, 132, 0.8)" : "#fff",
            },
          ]}
          onPress={() => handleChangePorcentaje(1.333)}
        >
          <TextView text="75%" color="#444" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                porcentaje === 1 ? "rgba(76, 211, 132, 0.8)" : "#fff",
            },
          ]}
          onPress={() => handleChangePorcentaje(1)}
        >
          <TextView text="100%" color="#444" />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 5, alignItems: "center" }}>
        <TextView text="o" color="#000" size={16} />
      </View>
      <View
        style={[
          styles.borders,
          { borderColor: focusable ? "rgb(76, 211, 132)" : "#aaa" },
        ]}
      >
        <TextView text="Ingresar inversión" color="#000" />
        <TextInput
          style={styles.textInput}
          onFocus={() => setFocusable(true)}
          value={amount}
          placeholder="$0.00"
          onChangeText={handleChangeText}
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={10}
        />
      </View>

      <View style={styles.row}>
        <TextView text="Total" color="#888" styleText={{ marginRight: 10 }} />
        <TextView text={`${formatPrice(amount)}`} color="#000" size={16} />
      </View>

      <View style={styles.row}>
        <TextView
          text="Cantidad"
          color="#888"
          styleText={{ marginRight: 10 }}
        />
        <TextView
          text={`x${
            Math.trunc(parseFloat(amount) / content.last_price)
              ? Math.trunc(parseFloat(amount) / content.last_price)
              : 0
          }`}
          color="#000"
          size={16}
        />
      </View>

      <View style={styles.rowEnd}>
        <TextView text="Balance" color="#888" styleText={{ marginRight: 10 }} />
        <TextView
          text={`${formatPrice(
            balances && parseFloat(amount)
              ? balances.balanceTotal - parseFloat(amount)
              : balances?.balanceTotal
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
            type: EnumTypeOperation.LIMIT,
            quantity: Math.trunc(parseFloat(amount) / content.last_price),
            price: content.last_price,
          })
        }
        style={[
          styles.btnBuy,
          {
            backgroundColor:
              parseFloat(amount) === 0 ||
              isNaN(parseFloat(amount)) ||
              !balances ||
              balances.balanceTotal - parseFloat(amount) < 0 ||
              Math.trunc(parseFloat(amount) / content.last_price) < 1
                ? "#ccc"
                : "#2e8a61",
          },
        ]}
        disabled={
          parseFloat(amount) === 0 ||
          isNaN(parseFloat(amount)) ||
          !balances ||
          balances.balanceTotal - parseFloat(amount) < 0 ||
          Math.trunc(parseFloat(amount) / content.last_price) < 1
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

export default ModalLimit;

const styles = StyleSheet.create({
  porcentajes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#aaa",
    width: Dimensions.get("screen").width / 6,
    paddingVertical: 5,
    alignItems: "center",
  },
  textInput: {
    width: "40%",
    textAlign: "right",
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
