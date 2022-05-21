import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Permissions = () => {
  return (
    <Container>
      <Text>접근 권한 안내</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Permissions;
