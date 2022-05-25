import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { PassportDetail, Stamps, QR } from "../screens";

const Stack = createStackNavigator();

const PassportDetailStack = ({ route }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitle: "" }}>
      <Stack.Screen name="PassportDetail" component={PassportDetail} />
      <Stack.Screen name="Stamps" component={Stamps} />
      <Stack.Screen name="QR" component={QR} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportDetailStack;
