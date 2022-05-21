import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Passport, PassportRegister } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import PassportDetailStack from "./PassportDetailStack";

const Stack = createStackNavigator();

const PassportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Passport"
      screenOptions={{ headerShown: true, headerTitle: "" }}
    >
      <Stack.Screen name="Passport" component={Passport} />
      <Stack.Screen
        name="PassportDetailStack"
        component={PassportDetailStack}
      />
      <Stack.Screen name="PassportRegister" component={PassportRegister} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportStack;
