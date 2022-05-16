import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button title="회원 가입" onPress={() => navigation.navigate("Signup")} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Login;
