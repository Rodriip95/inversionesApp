import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface iArrowBack {
  backNavigation?: (() => void) | null
}

const ArrowBack = ({backNavigation}:iArrowBack) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => backNavigation ? backNavigation () : navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default ArrowBack;
