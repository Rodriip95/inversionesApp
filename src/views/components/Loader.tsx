import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", padding: 20 },
});
