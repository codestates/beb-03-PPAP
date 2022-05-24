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

const UserVisaTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const CountryTitle = styled.Text`
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
  countryCode,
  isValidVisa,
}: {
  onPress?: Function;
  mainText?: string;
  subText?: string;
  countryCode?: string;
  isValidVisa?: boolean;
}) => {
  
  return (
    <Pressable onPress={onPress}>
      <Cover isLogined={isValidVisa}>
      <CountryTitle style={{ color: "#fff" }}>{countryCode}</CountryTitle>
      <UserVisaTitle>{mainText}</UserVisaTitle>
      <Text style={{ color: "#fff" }}>{subText}</Text>
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserVisa;
