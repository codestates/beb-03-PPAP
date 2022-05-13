import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import List from "../screens/List";
import Item from "../screens/Item";
import colors from "../assets/colorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { backgroundColor: "#fff" },
        headerTitle: ({ style }) => (
          <MaterialCommunityIcons name="react" style={style}>
            React-Native
          </MaterialCommunityIcons>
        ),
        headerStyle: {
          height: 100,
          backgroundColor: colors.main,
          borderBottomWidth: 5,
          borderBottomColor: colors.leaf,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 24,
        },
        headerTitleAlign: "center",
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: "List Screen",
          headerBackTitleVisible: true,
          headerBackTitle: "",
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: "#fff",
          headerBackImage: ({ tintColor }) => {
            const style = {
              marginRight: 5,
              marginLeft: Platform.OS === "ios" ? 11 : 0,
            };
            return (
              <Ionicons
                name="chevron-back"
                size={30}
                color={tintColor}
                style={style}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={Item} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigation;
