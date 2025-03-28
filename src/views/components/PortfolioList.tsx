import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivosObjType } from "../../types/types";
import TextView from "./TextView";
import { formatPrice } from "../../utlis/Formats";
import PortfolioItem from "./PortfolioItem";

interface iPortfolioList {
  portfolio: ActivosObjType[] | undefined;
}

const PortfolioList = ({ portfolio }: iPortfolioList) => {
  return (
    <View style={styles.container}>
      {portfolio?.map((p , i) => (
        <PortfolioItem key={i} activo={p} />
      ))}
    </View>
  );
};

export default PortfolioList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
  },
});
