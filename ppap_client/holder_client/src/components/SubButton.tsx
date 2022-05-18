import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.Pressable`
  align-items: center;
  width: 70%;
  padding: 10px;
`;

const Title = styled.Text``;

const SubButton = ({ title, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default SubButton;
