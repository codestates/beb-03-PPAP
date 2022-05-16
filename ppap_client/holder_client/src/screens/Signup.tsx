import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Signup = () => {
  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Signup Screen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Signup;
