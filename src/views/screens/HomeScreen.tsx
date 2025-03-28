import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import useInstruments from "../../hooks/useInstruments";
import { calculateReturn } from "../../utlis/Formats";
import usePortfolio from "../../hooks/usePortfolio";
import { StatusBar } from "expo-status-bar";
import ContainerScreen from "../components/ContainerScreen";
import BalanceHome from "../components/BalanceHome";
import InstrumentList from "../components/InstrumentList";
import BotoneraHome from "../components/BotoneraHome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { balances } = usePortfolio();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace("HomeScreen");
    }, 1000);
  };

  return (
    <ContainerScreen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BalanceHome balances={balances} />
        <BotoneraHome />
        <InstrumentList />
      </ScrollView>
    </ContainerScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
