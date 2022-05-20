import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { SubButton } from "../components";
import { useDispatch } from "react-redux";
import { unsetUser } from "../modules/userReducer";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(unsetUser());
    navigation.navigate("PassportStack");
  };

  return (
    <Container>
      <SubButton title="로그아웃" onPress={logout} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
