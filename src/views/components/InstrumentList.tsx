import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import useInstruments from "../../hooks/useInstruments";
import InstrumentItem from "./InstrumentItem";
import TextView from "./TextView";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { InstrumentObjType } from "../../types/types";
import SearchBarComponent from "./SearchBarComponent";

const InstrumentList = () => {
  const { instruments, loading, getSearchInstruments } = useInstruments();

  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState<InstrumentObjType[]>();

  const handleChangeText = async (text: string) => {
    setSearch(text);
    try {
      const response = await getSearchInstruments(text);
      setSearchItem(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBarComponent search={search} handleChangeText={handleChangeText} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {!instruments ? (
            <ErrorMsg />
          ) : (
            <>
              {searchItem && searchItem.length === 0 ? (
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                  <Ionicons
                    name="file-tray-outline"
                    size={50}
                    color="#404040"
                  />
                  <TextView
                    text="No se encontraron instrumentos"
                    size={18}
                    color="#404040"
                  />
                </View>
              ) : (
                (searchItem ? searchItem : instruments).map((activo) => (
                  <InstrumentItem key={activo.id} item={activo} />
                ))
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default InstrumentList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
  },
});
