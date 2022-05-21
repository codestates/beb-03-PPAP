import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  /* flex: 1; */
  /* justify-content: center; */
  /* align-items: center; */
  background-color: #fff;
  flex-direction: row;
  /* width: 50%; */
  justify-content: space-between;
  margin: 10px 0px;
`;
const Label = styled.Text`
  font-weight: 600;
  padding-right: 50px;
`;
const LabeledText = ({ label, text }: { label: string; text: string }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Text>{text}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default LabeledText;
