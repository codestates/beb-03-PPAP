import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  margin: 10px 2px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-left: 6px;
  color: ${({ theme }) => theme.darkgray};
`;

const StyledTextInput = styled.TextInput.attrs({})`
  background-color: #fff;
  border: 2px #eee solid;
  border-radius: 30px;
  padding: 2px 10px;
  width: 290px;
`;

const Input = ({
  label,
  isPassword,
  maxLength,
  onChangeText,
  isUpperCase,
  placeholder,
  value,
}: {
  label: string;
  isPassword?: boolean;
  maxLength?: number;
  onChangeText?: Function;
  isUpperCase?: boolean;
  placeholder?: string;
  value?: string;
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledTextInput
        secureTextEntry={isPassword}
        autoCapitalize={isUpperCase ? "characters" : "none"}
        autoCorrect={false}
        textContentType="none"
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Input;
