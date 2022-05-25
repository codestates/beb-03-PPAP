import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import Flag from "./Flag";
import { images } from "../utils/images";

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
const LabelText = styled.Text`
  max-width: 100px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabeledText = ({
  label,
  text,
  showIcon,
}: {
  label: string;
  text: string;
  showIcon?: boolean;
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper>
        <LabelText>{text}</LabelText>
        {showIcon && <Flag url={`${images.flag}%2F${text}.png?alt=media`} />}
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default LabeledText;
