import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";

const Cover = styled.View`
  background-color: ${({ theme, type, isLogined }) =>
    isLogined ? (type === "visa" ? theme.green : theme.navy) : theme.palegray};
  width: 300px;
  height: 450px;
  border-radius: 30px;
  justify-content: center;
  padding: 24px;
`;

const MainText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const StyledLogo = styled.ImageBackground`
  width: 50%;
  height: 50%;
`;

const Portable = ({
  onPress,
  mainText,
  subText,
  isValid,
  countryCode,
  type,
}: {
  onPress?: Function;
  mainText?: string;
  subText?: string;
  isValid?: boolean;
  countryCode?: string;
  type?: string;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Cover isLogined={isValid} type={type}>
        {isValid && <StyledLogo source={{ uri: images.color_logo }} />}
        <MainText>{mainText}</MainText>
        <Text style={{ color: "#fff" }}>{subText}</Text>
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default Portable;
