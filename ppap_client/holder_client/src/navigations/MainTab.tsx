import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "./LoginStack";
import PassportStack from "./PassportStack";
import VisaStack from "./VisaStack";
import { Setting, MyPage } from "../screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const theme = useContext(ThemeContext);
  const userInfo = useSelector((state) => state.userReducer).data;

  return (
    <Tab.Navigator
      initialRouteName="PassportStack"
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          let name = "";
          if (route.name === "PassportStack") name = "airplane";
          else if (route.name === "VisaStack") name = "application";
          else if (route.name === "LoginStack" || route.name === "MyPage")
            name = "account";
          else name = "more";

          return TabIcon({ ...props, name });
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.navy,
        tabBarInactiveTintColor: theme.lightgray,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="PassportStack"
        component={PassportStack}
        options={{ tabBarLabel: "DID 여권" }}
      />
      <Tab.Screen
        name="VisaStack"
        component={VisaStack}
        options={{ tabBarLabel: "VISA" }}
      />
      {userInfo ? (
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{ tabBarLabel: "마이페이지" }}
        />
      ) : (
        <Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{ tabBarLabel: "로그인" }}
        />
      )}

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ tabBarLabel: "설정" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainTab;
