import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BalanceHome from "../components/BalanceHome";
import PortfolioList from "../components/PortfolioList";
import usePortfolio from "../../hooks/usePortfolio";
import Loader from "../components/Loader";
import ContainerScreen from "../components/ContainerScreen";
import ArrowBack from "../components/ArrowBack";

const PortfolioScreen = () => {
  const { balances, portfolio, loading } = usePortfolio();

  return (
    <ContainerScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#000" }}
      >
        <View style={{ marginLeft: 20 }}>
          <ArrowBack />
        </View>
        <BalanceHome balances={balances} alternativeDesing />
        {loading ? <Loader /> : <PortfolioList portfolio={portfolio} />}
      </ScrollView>
    </ContainerScreen>
  );
};

export default PortfolioScreen;
