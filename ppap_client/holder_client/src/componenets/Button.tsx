import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.Pressable`
  /* background-color: #fff; */
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
`;

const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: red;
`;

const Button = ({
  containerStyle,
  title,
  onPress,
  isFilled,
}: {
  containerStyle: object;
  title: string;
  onPress: Function;
  isFilled: boolean;
}) => {
  return (
    <Container style={containerStyle} onPress={onPress} isFilled={isFilled}>
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

export default Button;
