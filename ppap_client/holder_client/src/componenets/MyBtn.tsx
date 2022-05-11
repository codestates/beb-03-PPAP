import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import colors from "../assets/colorScheme";

const MyBtn = ({ children }) => {
  return (
    <Pressable>
      <Text
        style={{
          fontSize: 24,
          backgroundColor: colors.main,
          padding: 16,
          margin: 10,
          borderRadius: 50,
        }}
        onPress={() => alert("Also Clicked!!!")}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default MyBtn;
