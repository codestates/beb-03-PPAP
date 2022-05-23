import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.Pressable.attrs((props) => ({
  width: props.width || "70%",
}))`
  align-items: center;
  /* width: 70%; */
  position: absolute;
  bottom: 3%;
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

const VisaButton = ({
  title,
  onPress,
  disabled,
  width,
}: {
  title: string;
  onPress: Function;
  disabled?: boolean;
  width?: string;
}) => {
  return (
    <Container onPress={onPress} disabled={disabled} width={width}>
      <Title>{title}</Title>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaButton;
