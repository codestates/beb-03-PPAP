import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";

const Cover = styled.View`
 background-color: ${({ theme, isLogined }) =>
    isLogined ? theme.lightblue : theme.palegray};
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

const UserVisa = ({
  onPress,
  mainText,
  subText,
  isValidVisa,
}: {
  onPress?: Function;
  mainText?: string;
  subText?: string;
  isValidVisa?: boolean;
}) => {
  
  return (
    <Pressable onPress={onPress}>
      <Cover isLogined={isValidVisa}>
        <UserPassportTitle>{mainText}</UserPassportTitle>
        <Text style={{ color: "#fff" }}>{subText}</Text>
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserVisa;