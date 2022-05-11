import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigations/StackNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
