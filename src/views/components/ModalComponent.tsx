import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../store/slices/modalSlice";
import { RootState } from "../../store/store";
import TextView from "./TextView";
import { calculateReturn, formatPrice } from "../../utlis/Formats";
import Loader from "./Loader";
import { EnumTypeOperation } from "../../types/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import usePortfolio from "../../hooks/usePortfolio";
import ModalDataInstrument from "./modal/ModalDataInstrument";
import ModalToggle from "./modal/ModalToggle";
import ModalMarket from "./modal/ModalMarket";
import ModalLimit from "./modal/ModalLimit";

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { visible, content } = useSelector((state: RootState) => state.modal);
  const { balances } = usePortfolio();
  const [select, setSelect] = useState<EnumTypeOperation>(
    EnumTypeOperation.MARKET
  );

  const [quantity, setQuantity] = useState<string>("");
  const [focusable, setFocusable] = useState<boolean>(false);

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setQuantity(numericValue);
  };

  const handlerClose = () => {
    setQuantity("");
    setFocusable(false);
    dispatch(hideModal());
  };

  return (
    <Modal isVisible={visible} onBackdropPress={handlerClose}>
      <View style={styles.modalContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextView text="Detalles de Activo" color="#000" />
          <TouchableOpacity
            onPress={handlerClose}
            style={{ right: -15, top: -5 }}
          >
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {!content ? (
          <Loader />
        ) : (
          <View>
            <ModalDataInstrument content={content} />
            <ModalToggle select={select} setSelect={setSelect} />
            {select === EnumTypeOperation.MARKET ? (
              <ModalMarket
                setFocusable={setFocusable}
                quantity={quantity}
                balances={balances}
                content={content}
                focusable={focusable}
                handleChangeText={handleChangeText}
                onClose={handlerClose}
              />
            ) : (
              <ModalLimit
                balances={balances}
                content={content}
                onClose={handlerClose}
              />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
});

export default ModalComponent;
