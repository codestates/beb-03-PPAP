import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../assets/colorScheme";
import { textStyles } from "../assets/styles";

const RNPressable = () => {
  const _onPressIn = () => console.log("Press In !!!");
  const _onPressOut = () => console.log("Press Out !!!");
  const _onPress = () => console.log("Press !!!");
  const _onLongPress = () => console.log("Press In !!!");
  return (
    <Pressable
      style={[textStyles.error, styles.box]}
      onPress={_onPress}
      onLongPress={_onLongPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      pressRetentionOffset={{ bottom: 50, left: 50, right: 50, top: 50 }}
      hitSlop={50}
    >
      <Text style={{ padding: 10, fontSize: 30 }}>테스트 버튼</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "500",
  },
  box: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: colors.main,
  },
});

export default RNPressable;
