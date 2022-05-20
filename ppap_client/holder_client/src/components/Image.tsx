import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;
const StyledImage = styled.ImageBackground`
  width: 100px;
  height: 100px;
`;

const Image = ({ url }: { url: string }) => {
  return (
    <Container>
      <StyledImage
        source={{
          uri: url,
        }}
      ></StyledImage>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Image;
