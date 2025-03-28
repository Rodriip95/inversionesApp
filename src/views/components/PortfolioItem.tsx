import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ActivosObjType } from "../../types/types";
import TextView from "./TextView";
import { formatPrice } from "../../utlis/Formats";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EnumScreens, RootStackParamList } from "../../navigation/AppNavigator";

interface iPortfolioItem {
  activo: ActivosObjType;
}

const PortfolioItem = ({ activo }: iPortfolioItem) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(EnumScreens.PORTFOLIO_DETAIL, { activo })
      }
    >
      <View style={{ justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextView text={activo.ticker} color="#fff" size={20} />
          <TextView text={` x${activo.quantity}`} color="#fff" size={12} />
        </View>
        <TextView text={`ID ${activo.instrument_id}`} color="#888" />
        <TextView
          text={`AVG Price ${formatPrice(activo.avg_cost_price)}`}
          color="#fff"
        />
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <TextView
          text={`${formatPrice(activo.balance.valorMercado)}`}
          color="#fff"
          size={24}
          semiBold
        />
        <TextView
          text={`${activo.balance.gananciaActivo > 0 ? "+" : ""}${formatPrice(
            activo.balance.gananciaActivo
          )} (${activo.balance.porcentajeRendimientoTotal}%)`}
          color={activo.balance.gananciaActivo >= 0 ? "#2e8a61" : "#cc441c"}
          size={12}
          semiBold
        />
        <TextView
          text={`Price ${formatPrice(activo.last_price)}`}
          color="#fff"
        />
      </View>
    </TouchableOpacity>
  );
};

export default PortfolioItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: "#252525",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
