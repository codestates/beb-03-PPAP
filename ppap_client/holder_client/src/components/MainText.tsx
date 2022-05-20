import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

const MainText = ({ title }: { title: string }) => {
  return <Title>{title}</Title>;
};

const styles = StyleSheet.create({});

export default MainText;
