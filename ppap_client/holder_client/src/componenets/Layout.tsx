import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../assets/colorScheme";

export const Header = () => {
  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export const Contents = () => {
  return (
    <View style={[styles.container, styles.contents]}>
      <Text style={styles.text}>Contents</Text>
    </View>
  );
};

export const Footer = () => {
  return (
    <View style={[styles.container, styles.footer]}>
      <Text style={styles.text}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    // flex: 1,
  },
  header: {
    // flex: 1,
    backgroundColor: colors.lime,
  },
  contents: {
    flex: 1,
    backgroundColor: colors.leaf,
    // height: 640,
  },
  footer: {
    // flex: 1,
    backgroundColor: colors.dark,
  },
  text: {
    fontSize: 26,
  },
});
