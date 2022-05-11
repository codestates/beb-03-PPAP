import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../assets/colorScheme";

const EventButton = () => {
  const _onPressIn = () => console.log("Press In !!!");
  const _onPressOut = () => console.log("Press Out !!!");
  const _onPress = () => console.log("Press !!!");
  const _onLongPress = () => console.log("Press In !!!");
  return (
    <Pressable
      style={{
        backgroundColor: colors.lime,
        padding: 16,
        margin: 10,
        borderRadius: 8,
      }}
      onPress={_onPress}
      onLongPress={_onLongPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      delayLongPress={3000}
    >
      <Text style={{ color: colors.dark, fontSize: 24 }}>Press</Text>
    </Pressable>
  );
};

export default EventButton;
