import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnalyzeScreen from "./src/screens/AnalyzeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <AnalyzeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000000",
  },
});