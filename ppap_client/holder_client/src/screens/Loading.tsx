import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>텍스트</Text>
    </View>
  );
};

const theme = {
  main: "#45C4B0",
  leaf: "#9AEBA3",
  lime: "#DAFDBA",
  blue: "#13678A",
  dark: "#012030",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.main,
  },
});

export default Loading;
