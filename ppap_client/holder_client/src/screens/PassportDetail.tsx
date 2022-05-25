import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../utils/envFile";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const PassportDetail = ({ navigation, route }) => {
  return (
    <Container>
      <Text>PassportDetail</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PassportDetail;
