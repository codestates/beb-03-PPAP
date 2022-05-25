import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Alert = styled.Text`
  text-align: center;
  margin: 30px 0px;
  padding: 10px 15px;
  color: ${({ theme }) => theme.navy};
  font-weight: 600;
  border-radius: 10px;
  background-color: #f2f6fc;
`;

const MessageAlert = ({ message }: { message: string }) => {
  return <Alert>{message}</Alert>;
};

const styles = StyleSheet.create({});

export default MessageAlert;
