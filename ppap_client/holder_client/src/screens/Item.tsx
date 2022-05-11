import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Item = () => {
  return (
    <Container>
      <StyledText>Item</StyledText>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Item;
