import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PassportDetail, Stamps, QR } from "../screens";

const Tab = createBottomTabNavigator();

const PassportDetailTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="PassportDetail" component={PassportDetail} />
      <Tab.Screen name="Stamps" component={Stamps} />
      <Tab.Screen name="QR" component={QR} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default PassportDetailTab;
