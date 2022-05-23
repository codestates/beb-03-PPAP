import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import {LabeledText,MainText } from "../components"
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  
`;

const Wrapper = styled.View`
  justify-content: center;
  width: 50%;
  border: 3px;
  padding: 10px;
  border-radius: 10px;
  border-color: gray;
`;

const VisaDetail = ({ route, navigation }) => {
  const {visaInfo} = route.params;
  console.log(visaInfo);
  return (
    <Container>
      <MainText title="비자 발급 정보"/>
       <Wrapper>
        <LabeledText label="성명" text={visaInfo.user_name} />
        <LabeledText label="성별" text={visaInfo.sex} />
        <LabeledText label="생년월일" text={visaInfo.birth} />
        <LabeledText label="나이" text={visaInfo.age} />
        <LabeledText label="국가" text={visaInfo.country_code} />
        <LabeledText label="비자 이름" text={visaInfo.visa_name} />
        <LabeledText label="비자 목적" text={visaInfo.visa_purpose} />
        <LabeledText label="비자 유효기간" text={visaInfo.visa_expired_date} />
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaDetail;
