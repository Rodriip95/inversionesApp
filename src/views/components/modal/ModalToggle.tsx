import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EnumTypeOperation } from "../../../types/types";
import TextView from "../TextView";

interface iModalToggle {
  select: EnumTypeOperation;
  setSelect: (any: any) => void;
  backgroundColorProp?: string;
}

const ModalToggle = ({ select, setSelect, backgroundColorProp }: iModalToggle) => {
  return (
    <View style={styles.toggleCont}>
      <TouchableOpacity
        onPress={() => setSelect(EnumTypeOperation.MARKET)}
        style={[
          styles.toggle,
          {
            backgroundColor:
              select === EnumTypeOperation.MARKET
                ? "rgb(76, 211, 132)"
                : backgroundColorProp ? backgroundColorProp : "#fff",
          },
        ]}
      >
        <TextView text="MARKET" color={select === EnumTypeOperation.MARKET ? "#fff" : backgroundColorProp ? "#aaa" : "#000"} />
      </TouchableOpacity>
      <View style={styles.lineDivider} />
      <TouchableOpacity
        onPress={() => setSelect(EnumTypeOperation.LIMIT)}
        style={[
          styles.toggle,
          {
            backgroundColor:
              select === EnumTypeOperation.LIMIT ? "rgb(76, 211, 132)" : backgroundColorProp ? backgroundColorProp : "#fff",
          },
        ]}
      >
        <TextView text="LIMIT" color={select === EnumTypeOperation.LIMIT ? "#fff" : backgroundColorProp ? "#aaa" : "#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalToggle;

const styles = StyleSheet.create({
  toggleCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },
  toggle: { flex: 0.5, alignItems: "center", paddingVertical: 10 },
  lineDivider: {
    borderLeftWidth: 1,
    height: "60%",
    borderColor: "#aaa",
  },
});
