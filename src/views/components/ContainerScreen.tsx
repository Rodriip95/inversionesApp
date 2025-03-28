import React from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";

const ContainerScreen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
});

export default ContainerScreen;
