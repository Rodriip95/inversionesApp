import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextView from "../TextView";
import { calculateReturn, formatPrice } from "../../../utlis/Formats";
import { InstrumentObjType } from "../../../types/types";

interface iModalDataInstrument {
  content: InstrumentObjType;
}

const ModalDataInstrument = ({ content }: iModalDataInstrument) => {
  return (
    <View style={styles.row}>
      <View style={{ width: "80%" }}>
        <TextView text={content.name} size={20} color="#000" />
        <TextView text={content.ticker} color="#000" />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TextView
          text={`${formatPrice(content.last_price)}`}
          size={20}
          color="#000"
        />
        <TextView
          color={
            calculateReturn(content.last_price, content.close_price) >= 0
              ? "#2e8a61"
              : "#cc441c"
          }
          text={`${
            calculateReturn(content.last_price, content.close_price) > 0
              ? "+"
              : ""
          }${calculateReturn(content.last_price, content.close_price)}%`}
        />
      </View>
    </View>
  );
};

export default ModalDataInstrument;

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
});
