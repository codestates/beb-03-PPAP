import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const InfoCollectAgreement = () => {
  return (
    <Container>
      <Text>정보수집약관 동의</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default InfoCollectAgreement;
