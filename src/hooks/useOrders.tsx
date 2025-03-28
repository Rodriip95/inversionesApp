import { View, Text } from "react-native";
import React, { useState } from "react";
import ApiServices from "../services/ApiServices";
import { TypeBody } from "../types/types";
import { useDispatch } from "react-redux";
import { addOrder } from "../store/slices/orderSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface iUseOrders {
  onFinish: () => void;
}

const useOrders = ({ onFinish }: iUseOrders) => {
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const postRequestOrder = async (body: TypeBody) => {
    try {
      const data = await ApiServices.postOrder(body);
      dispatch(addOrder(data));
      return data;
    } catch (error) {
      return null;
    }
  };

  const sendOrder = async (body: TypeBody) => {
    setloading(true);
    setError(false);
    try {
      const response = await postRequestOrder(body);
      if (response) {
        navigation.navigate("RequestScreen", {
          data: response,
        });
        onFinish();
      }
    } catch (error) {
      setError(true);
    } finally {
      setloading(false);
    }
  };

  return {
    postRequestOrder,
    sendOrder,
    error,
    loading,
  };
};

export default useOrders;
