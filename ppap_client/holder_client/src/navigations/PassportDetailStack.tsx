import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { PassportDetail, Stamps, QR, PassportRegister } from "../screens";

const Stack = createStackNavigator();

const PassportDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitle: "" }}>
      <Stack.Screen name="PassportDetail" component={PassportDetail} />
      <Stack.Screen name="Stamps" component={Stamps} />
      <Stack.Screen name="QR" component={QR} />
      <Stack.Screen name="PassportRegister" component={PassportRegister} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportDetailStack;
