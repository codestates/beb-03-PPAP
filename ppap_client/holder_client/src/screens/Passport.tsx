import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { UserPassport } from "../components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Passport = ({ navigation }) => {
  const userInfo = useSelector((state) => state.userReducer).data;

  return (
    <Container>
      <UserPassport
        onPress={() => navigation.navigate("PassportDetailStack")}
        mainText={userInfo ? "DID 여권" : "로그인을 진행해주세요"}
        subText={userInfo ? userInfo.userData.user_name : ""}
        isLogined={!!userInfo}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Passport;
