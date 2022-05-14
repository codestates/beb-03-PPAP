import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
// import TabNavigation from "./navigations/TabNavigation";
import Navigation from "./navigations";
import { images } from "./utils/Images";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    // <NavigationContainer>
    <Navigation />
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
