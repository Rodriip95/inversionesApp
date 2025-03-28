import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  EnumTypeOperation,
  EnumTypeOrder,
  EnumTypeStatus,
  TypeResponseOrder,
} from "../../types/types";
import ContainerScreen from "../components/ContainerScreen";
import TextView from "../components/TextView";
import { formatPrice } from "../../utlis/Formats";
import ArrowBack from "../components/ArrowBack";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { EnumScreens, RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface iRequestScreen {
  route?: {
    params: {
      data: TypeResponseOrder | null;
    };
  };
}

export const formatSide = (side: EnumTypeOrder) => {
  switch (side) {
    case EnumTypeOrder.BUY:
      return "COMPRA";
    case EnumTypeOrder.SELL:
      return "VENTA";
    default:
      break;
  }
};

export const colorStatus = (status: EnumTypeStatus) => {
  switch (status) {
    case EnumTypeStatus.FILLED:
      return "#2e8a61";
    case EnumTypeStatus.REJECTED:
      return "#cc441c";
    case EnumTypeStatus.PENDING:
      return "rgb(249 189 4)";
    default:
      break;
  }
};

const RequestScreen = ({ route }: iRequestScreen) => {
  const data = route && route.params.data
  const { orders } = useSelector((state: RootState) => state.orders);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigationForSell = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: "HomeScreen" }, 
        { name: "PortfolioScreen" }
      ],
    });
  }

  return (
    <ContainerScreen>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <ArrowBack backNavigation={data?.side === EnumTypeOrder.SELL ? handleNavigationForSell : null}/>
        </View>
        {data ? (
          <>
            <View style={styles.titleCont}>
              <TextView text="Última operación" size={18} />
            </View>
            <OrderItem data={data} />
            <View style={styles.line} />
          </>
        ) : (
          <View style={styles.titleCont}>
            <TextView text="Historial de ordenes" size={18} />
          </View>
        )}
        {orders.map(
          (order, index) =>
            (index !== 0 || !data) && (
              <View style={{ marginBottom: 20 }} key={index}>
                <OrderItem data={order} />
              </View>
            )
        )}
        {orders.length === 0 && <View
        style={styles.center}>
            <Ionicons name="file-tray-outline" size={50} color="#404040" />
            <TextView text="No tienes ordenes realizadas" size={18} color="#404040"/>
          </View>}
      </ScrollView>
    </ContainerScreen>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  line: {
    borderTopWidth: 1,
    borderColor: "#222",
    width: "100%",
    marginVertical: 20,
  },
  titleCont: { alignItems: "center", marginBottom: 20 },
  center: {justifyContent: 'center', alignItems: 'center', marginTop: 40}
});
