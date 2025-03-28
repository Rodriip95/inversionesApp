import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { calculateReturn, formatPrice } from "../../utlis/Formats";
import TextView from "./TextView";
import { InstrumentObjType } from "../../types/types";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";

interface InstrumentItem {
    item: InstrumentObjType;
}

const InstrumentItem = ({ item }: InstrumentItem) => {
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: 20,
      marginVertical: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      backgroundColor: "#252525",
    },
    w70: {
      width: "70%",
    },
    rightContainer: {
      flex: 1,
      alignItems: "flex-end",
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={() => dispatch(showModal(item))}>
      <View style={styles.w70}>
        <TextView text={item.name} size={16} />
        <TextView text={item.ticker} color="#aaa"/>
      </View>
      <View style={styles.rightContainer}>
        <TextView text={`${formatPrice(item.last_price)}`} size={16} />
        <TextView
          color={
            calculateReturn(item.last_price, item.close_price) >= 0
              ? "#2e8a61"
              : "#cc441c"
          }
          text={`${
            calculateReturn(item.last_price, item.close_price) > 0 ? "+" : ""
          }${calculateReturn(item.last_price, item.close_price)}%`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default InstrumentItem;
