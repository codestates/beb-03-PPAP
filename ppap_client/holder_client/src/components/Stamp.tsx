import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.ImageBackground`
  width: 65px;
  height: 65px;
  margin: 10px;
  /* border: 1px solid #eee; */
  /* border-radius: 30px; */
`;

const CountryText = styled.Text`
  font-weight: 500;
`;

const TypeText = styled.Text`
  background: #eee;
  font-size: 12px;
  color: ${({ theme }) => theme.navy};
  padding: 0px 10px;
  align-items: center;
  border-radius: 10px;
  margin: 0px 3px;
`;

const TimeText = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.navy};
`;

const Wrapper = styled.View`
  flex-direction: row;
`;

const Stamp = ({ url, timeStamp, Immigration, countryCode }) => {
  return (
    <Container>
      <StyledImage
        source={{
          uri: url,
        }}
        imageStyle={{ borderRadius: 10 }}
      />
      <Wrapper>
        <TypeText>{Immigration.substr(0, 3).toUpperCase()}</TypeText>
        <CountryText>{countryCode}</CountryText>
      </Wrapper>
      <TimeText>{moment(timeStamp.toString()).format("YY/MM/DD")}</TimeText>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Stamp;
