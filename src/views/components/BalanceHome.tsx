import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import usePortfolio, { iBalance } from "../../hooks/usePortfolio";
import { formatPrice } from "../../utlis/Formats";
import TextView from "./TextView";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface iBalanceHome {
  balances: iBalance | undefined;
  alternativeDesing?: boolean;
}

const BalanceHome = ({ balances, alternativeDesing }: iBalanceHome) => {
  const styles = StyleSheet.create({
    pill: {
      backgroundColor:
        balances && balances?.porcentajeBalanceTotal > 0
          ? "#2e8a61"
          : "#cc441c",
      color: "#000",
      borderRadius: 15,
      paddingHorizontal: 8,
      paddingTop: 3,
      marginLeft: 10,
    },
    container: {
      backgroundColor: "#202020",
      marginHorizontal: 20,
      borderRadius: 20,
      padding: 20,
      marginVertical: 20,
    },
    containerAlt: {
      marginHorizontal: 20,
      borderRadius: 20,
      padding: 20,
      marginVertical: 20,
      alignItems: "center",
    },
    row: { flexDirection: "row", alignItems: "center" },
  });

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(100); 

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateX.value = withTiming(0, { duration: 300 });
    }, 300);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  if (alternativeDesing) {
    return (      
      <Animated.View style={[styles.containerAlt, animatedStyle]}>
        <TextView text={"Balance Total de mi Portfolio"} size={18} semiBold/>
        <TextView
          text={balances ? `${formatPrice(balances?.balanceTotal)}` : "****.**"}
          size={38}
          semiBold
        />
        <TextView
          text={
            balances
              ? `${balances?.balanceTotalGanancias > 0 ? "+" : ""}${formatPrice(
                  balances?.balanceTotalGanancias
                )} (${balances?.porcentajeBalanceTotal}%)`
              : "****.**"
          }
          size={18}
          color={
            balances && balances.balanceTotalGanancias >= 0
              ? "#2e8a61"
              : "#cc441c"
          }
          semiBold
        />
      </Animated.View>
    );
  }

  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.row}>
        <TextView text={"Balance Total"} size={18} semiBold/>
        {balances && (
          <TextView
            text={`${balances?.porcentajeBalanceTotal}%`}
            styleText={styles.pill}
          />
        )}
      </View>
      <TextView
        text={balances ? `${formatPrice(balances?.balanceTotal)}` : "****.**"}
        size={30}
        semiBold
      />
    </TouchableOpacity>
  );
};

export default BalanceHome;
