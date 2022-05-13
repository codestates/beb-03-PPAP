import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* background-color: #fff; */
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Item = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: "#fff",
      headerLeft: ({ onPress, tintColor }) => {
        return (
          <Ionicons
            name="chevron-back"
            size={30}
            style={{ marginLeft: 11 }}
            color={tintColor}
            onPress={onPress}
          />
        );
      },
      headerRight: ({ tintColor }) => (
        <Ionicons
          name="home-sharp"
          size={30}
          style={{ marginRight: 11 }}
          onPress={() => navigation.popToTop()}
          color={tintColor}
        />
      ),
    });
  }, []);

  return (
    <Container>
      <StyledText>Item</StyledText>
      <StyledText>ID: {route.params.id}</StyledText>
      <StyledText>Name: {route.params.name}</StyledText>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Item;
