import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";
import { InstrumentObjType } from "../types/types";

const useInstruments = () => {
  const [loading, setloading] = useState(false)
  const [instruments, setInstruments] = useState<InstrumentObjType[] | undefined>();

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {
    setloading(true)
    try {
      const data = await ApiServices.getInstruments();
      setInstruments(data);
    } catch (error) {
      setInstruments(undefined);
    } finally {
      setloading(false)
    }
  };

  const getSearchInstruments = async (text:string) => {
    setloading(true)
    try {
      const data = await ApiServices.getSearchInstruments(text);
      return data
    } catch (error) {
      return null
    } finally {
      setloading(false)
    }
  };

  return {
    instruments,
    loading,
    getSearchInstruments
  };
};

export default useInstruments;
