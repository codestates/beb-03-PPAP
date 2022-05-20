import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Login, Signup, ConfirmAlert } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const LoginStack = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  const isAlertFocused = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Login";
    return routeName === "ConfirmAlert";
  };

  useEffect(() => {
    if (isAlertFocused(route)) {
      console.log("동작");
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
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ConfirmAlert" component={ConfirmAlert} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default LoginStack;
