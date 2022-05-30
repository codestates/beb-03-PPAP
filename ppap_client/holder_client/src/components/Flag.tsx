import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const StyledImage = styled.ImageBackground`
  width: 20px;
  height: 15px;
  margin-left: 5px;
`;

const Flag = ({ url }: { url: string }) => {
  return (
    <StyledImage
      source={{
        uri: url,
      }}
    ></StyledImage>
  );
};

const styles = StyleSheet.create({});

export default Flag;
