import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { MainButton, MainText, Image } from "../components";
import { images } from "../utils/images";

const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
`;

const ConfirmAlert = ({ route, navigation, setFocused }) => {
  const { mainText } = route.params;

  return (
    <Container>
      <View>
        <Image url={images.confirm} />
        <MainText title={mainText} />
      </View>
      <MainButton
        title="확인"
        width="50%"
        onPress={() => navigation.popToTop()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default ConfirmAlert;
