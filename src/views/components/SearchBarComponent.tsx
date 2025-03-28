import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface iSearchBar {
  search: string;
  handleChangeText: (text: string) => Promise<void>;
}

const SearchBarComponent = ({ search, handleChangeText }: iSearchBar) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color="#ccc" />
      <TextInput
        placeholder="Buscar..."
        value={search}
        onChangeText={handleChangeText}
        style={styles.input}
        placeholderTextColor={"#ccc"}
        maxLength={10}
      />
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: { flex: 1, color: "#fff" },
});
