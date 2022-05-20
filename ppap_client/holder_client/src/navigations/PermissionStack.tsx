import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Permission, InfoCollectAgreement } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const PermissionStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="Permission">
      <Stack.Screen name="Permission" component={Permission} />
      <Stack.Screen
        name="InfoCollectAgreement"
        component={InfoCollectAgreement}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PermissionStack;
