import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { MainText } from "../components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Setting = () => {
  return (
    <Container>
      <MainText title="설정" />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Setting;
