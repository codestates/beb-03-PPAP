import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Passport, PassportRegister, ConfirmAlert } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import PassportDetailStack from "./PassportDetailStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const PassportStack = ({ route, navigation }) => {
  const isAlertFocused = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Passport";
    return routeName === "ConfirmAlert";
  };

  useEffect(() => {
    if (isAlertFocused(route)) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [navigation, route]);

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
      <Stack.Screen
        name="ConfirmAlert"
        component={ConfirmAlert}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportStack;
