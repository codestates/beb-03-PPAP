import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Passport } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import PassportDetailTab from "./PassportDetailTab";

const Stack = createStackNavigator();

const PassportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Passport"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Passport" component={Passport} />
      <Stack.Screen name="PassportDetailTab" component={PassportDetailTab} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportStack;
