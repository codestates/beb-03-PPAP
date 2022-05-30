import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";

const Container = styled.View``;

const StyledImage = styled.ImageBackground`
  width: 65px;
  height: 65px;
  margin: 10px;
  border: 1px solid #eee;
`;

const countryCode = styled.Text`
  font-weight: 500;
`;

const Stamp = ({ url, timeStamp, Immigration, countryCode }) => {
  return (
    <Container>
      <StyledImage
        source={{
          uri: url,
        }}
      />
      <Text>{countryCode}</Text>
      <Text>{Immigration.substr(0, 3)} @ </Text>
      <Text>{moment(timeStamp.toString()).format("YY/MM/DD")}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Stamp;
