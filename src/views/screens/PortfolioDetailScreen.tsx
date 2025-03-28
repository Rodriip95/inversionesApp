import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { ActivosObjType, EnumTypeOperation } from "../../types/types";
import ContainerScreen from "../components/ContainerScreen";
import ArrowBack from "../components/ArrowBack";
import TextView from "../components/TextView";
import { formatPrice } from "../../utlis/Formats";
import ModalToggle from "../components/modal/ModalToggle";
import DetailMarket from "../components/portfolioDetail/DetailMarket";
import ModalLimit from "../components/modal/ModalLimit";
import DetailLimit from "../components/portfolioDetail/DetailLimit";

interface iPortfolioDetailScreen {
  route: {
    params: {
      activo: ActivosObjType;
    };
  };
}

const PortfolioDetailScreen = ({ route }: iPortfolioDetailScreen) => {
  const { activo } = route.params;
    const [select, setSelect] = useState<EnumTypeOperation>(
      EnumTypeOperation.MARKET
    );
    const [quantity, setQuantity] = useState<string>("");
      const [focusable, setFocusable] = useState<boolean>(false);
    
    const handleChangeText = (text: string) => {
      const numericValue = text.replace(/[^0-9]/g, "");
      setQuantity(numericValue);
    };

  return (
    <ContainerScreen>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <ArrowBack />
        <View style={{ alignItems: "center" }}>
          <TextView text="Detalles de Activo" size={18} />
        </View>
        <View style={styles.container}>
          <View style={styles.center}>
            <TextView
              text={`${formatPrice(activo.balance.valorMercado)}`}
              color="#fff"
              size={38}
            />
            <TextView
              text={`${
                activo.balance.gananciaActivo > 0 ? "+" : ""
              }${formatPrice(activo.balance.gananciaActivo)} (${
                activo.balance.porcentajeRendimientoTotal
              }%)`}
              color={activo.balance.gananciaActivo >= 0 ? "#2e8a61" : "#cc441c"}
              size={16}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextView text={activo.ticker} color="#fff" size={30} />
                <TextView
                  text={` x${activo.quantity}`}
                  color="#fff"
                  size={12}
                />
              </View>
              <TextView text={`ID ${activo.instrument_id}`} color="#888" />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TextView
                text={`${formatPrice(activo.last_price)}`}
                color="#fff"
                size={24}
              />
              <TextView
                text={`AVG Price ${formatPrice(activo.avg_cost_price)}`}
                color="#fff"
              />
            </View>
          </View>
          <ModalToggle
            select={select}
            setSelect={setSelect}
            backgroundColorProp={"#252525"}
          />
          {select === EnumTypeOperation.MARKET ? (
            <DetailMarket
              setFocusable={setFocusable}
              quantity={quantity}
              focusable={focusable}
              handleChangeText={handleChangeText}
              activo={activo}
            />
          ) : (
            <DetailLimit activo={activo} />
          )}
        </View>
      </ScrollView>
    </ContainerScreen>
  );
};

export default PortfolioDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: "#252525",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  center: { alignItems: "center", justifyContent: "center" },
});
