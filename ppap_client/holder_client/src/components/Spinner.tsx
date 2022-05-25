import React, { useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.spinnerBackground};
`;

const Spinner = () => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.spinnerIndicator} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Spinner;
