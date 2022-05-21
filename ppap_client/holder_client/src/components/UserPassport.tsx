import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";

const Cover = styled.View`
  background-color: ${({ theme, isLogined }) =>
    isLogined ? theme.navy : theme.palegray};
  width: 300px;
  height: 450px;
  border-radius: 30px;
  justify-content: center;
  padding: 24px;
`;

const UserPassportTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const StyledLogo = styled.ImageBackground`
  width: 50%;
  height: 50%;
`;

const UserPassport = ({
  onPress,
  mainText,
  subText,
  isLogined,
}: {
  onPress?: Function;
  mainText?: string;
  subText?: string;
  isLogined?: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Cover isLogined={isLogined}>
        <StyledLogo source={isLogined ? { uri: images.color_logo } : {}} />
        <UserPassportTitle>{mainText}</UserPassportTitle>
        <Text style={{ color: "#fff" }}>{subText}</Text>
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserPassport;