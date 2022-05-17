import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Visa, VisaDetail, VisaRegister } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const VisaStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Visa"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Visa" component={Visa} />
      <Stack.Screen name="VisaDetail" component={VisaDetail} />
      <Stack.Screen name="VisaRegister" component={VisaRegister} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default VisaStack;
