import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.Pressable`
  align-items: center;
  width: 70%;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.lightgray : theme.navy};
`;

const Title = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 16px;
`;

const MainButton = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: Function;
  disabled?: boolean;
}) => {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Title>{title}</Title>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default MainButton;
