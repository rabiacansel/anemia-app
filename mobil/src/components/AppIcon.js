import React from "react";
import { StyleSheet, View, Image } from "react-native";

const AppIcon = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../assets/appicon.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default AppIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ac1521",

    // default size (override edilebilir)
    width: 70,
    height: 70,

    elevation: 20,

    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "60%",
    height: "60%",
  },
});