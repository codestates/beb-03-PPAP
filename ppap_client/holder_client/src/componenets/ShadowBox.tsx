import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

const ShadowBox = () => {
  return <View style={styles.shadow}></View>;
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    width: 200,
    height: 200,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});

export default ShadowBox;
