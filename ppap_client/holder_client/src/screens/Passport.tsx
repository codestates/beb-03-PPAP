import React from "react";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const StyledLogo = styled.ImageBackground`
  width: 50%;
  height: 50%;
`;

const UserPassport = styled.View`
  background-color: ${({ theme }) => theme.navy};
  width: 300px;
  height: 450px;
  border-radius: 30px;
  justify-content: center;
  padding: 24px;
  /* align-items: center; */
`;

const UserPassportTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const Passport = ({ navigation }) => {
  return (
    <Container>
      <Pressable onPress={() => navigation.navigate("PassportDetailTab")}>
        <UserPassport>
          <StyledLogo source={{ uri: images.color_logo }} />
          <UserPassportTitle>DID 여권</UserPassportTitle>
          <Text style={{ color: "#fff" }}>김코딩</Text>
        </UserPassport>
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Passport;
