import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import colors from "../assets/colorScheme";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? colors.main : colors.dark};
`;

const StyledTextInput = styled.TextInput`
  background-color: #fff;
  color: ${colors.dark};
  padding: 10px 10px;
  font-size: 16px;
  border: 2px #eee solid;
  ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? colors.main : colors.dark}
  border-radius: 4px;
`;

const Input = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  isPassword,
  returnKeyType,
  maxLength,
}: {
  label?: string;
  value: string;
  onChangeText?;
  onSubmitEditing?;
  placeholder?: string;
  isPassword?: boolean;
  returnKeyType?;
  maxLength?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Label isFocused={isFocused}>{label}</Label>
      <StyledTextInput
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        underlineColorAndroid="transparent"
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Input;
