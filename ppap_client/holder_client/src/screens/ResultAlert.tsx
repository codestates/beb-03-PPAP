import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ResultAlert = () => {
  return (
    <Container>
      <Text>모든 설정이 완료되었습니다</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default ResultAlert;
