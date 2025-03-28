import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TextView from "./TextView";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EnumScreens, RootStackParamList } from "../../navigation/AppNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

const BotoneraHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.contBtn}>
        <TouchableOpacity
          style={styles.botones}
          onPress={() => navigation.navigate(EnumScreens.PORTFOLIO_SCREEN)}
        >
          <Ionicons name="wallet-outline" size={24} color="white" />
        </TouchableOpacity>
        <TextView text="Mi Portfolio" />
      </View>

      <View style={styles.contBtn}>
        <TouchableOpacity
          style={styles.botones}
          onPress={() =>
            navigation.navigate(EnumScreens.REQUEST_SCREEN, {
              data: null,
            })
          }
        >
          <Ionicons name="documents-outline" size={24} color="white" />
        </TouchableOpacity>
        <TextView text="Ordenes" />
      </View>
    </View>
  );
};

export default BotoneraHome;

const styles = StyleSheet.create({
  botones: {
    backgroundColor: "#2e8a61",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  contBtn: {
    flex: 0.3,
    alignItems: "center",
  },
});
