import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "./LoginStack";
import PassportStack from "./PassportStack";
import VisaStack from "./VisaStack";
import { Setting } from "../screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="PassportStack"
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          let name = "";
          if (route.name === "PassportStack") name = "airplane";
          else if (route.name === "VisaStack") name = "application";
          else if (route.name === "LoginStack") name = "account";
          else name = "more";

          return TabIcon({ ...props, name });
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.navy,
        tabBarInactiveTintColor: theme.lightgray,
      })}
    >
      <Tab.Screen
        name="PassportStack"
        component={PassportStack}
        options={{ tabBarLabel: "DID 여권", headerTitle: "" }}
      />
      <Tab.Screen
        name="VisaStack"
        component={VisaStack}
        options={{ tabBarLabel: "VISA", headerTitle: "" }}
      />
      <Tab.Screen
        name="LoginStack"
        component={LoginStack}
        options={{ tabBarLabel: "로그인", headerTitle: "" }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ tabBarLabel: "설정", headerTitle: "" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainTab;
