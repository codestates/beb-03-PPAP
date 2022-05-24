import React from "react";
import { View, StyleSheet, Text, Pressable, Button } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import env from "../utils/envFile";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cover = styled.View`
  background-color: lightgray;
  width: 300px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 30px;
  justify-content: center;
  padding: 24px;
  align-items: stretch;
`;

const VisaText = styled.Text`
  color: black;
  font-size: 12px;
  font-weight: 700;
  
`;

const StyledLogo = styled.ImageBackground`
  width: 50%;
  height: 50%;
`;

const Title = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 16px;
`;

const Container = styled.Pressable.attrs((props) => ({
  width: props.width || "80%",
}))`
  align-items: center;
  /* width: 70%; */
  margin: 10px;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.lightgray : theme.navy};
`;

const UserRequestVisa = ({navVisa, visaRequestData }: {navVisa?:Function, visaRequestData?: object }) => {

  const userInfo = useSelector((state: any) => state.userReducer).data;

  const getVisaVc = async () => {
    console.log("버튼 클릭");
    let output = await axios.post(
      `${env.server}/holder/issueVisaVC`,
      { visa_survey_id: visaRequestData.visa_survey_id },
      {
        headers: { authorization: userInfo.accessToken },
      },
    );

    if(output.status===200){
      await AsyncStorage.getItem("@visa_jwt_arr").then(async (data) => {
        if (data === null) {
          console.log("null");
          const visaArray = [output.data.data.vcVisaJwt];
          AsyncStorage.setItem("@visa_jwt_arr", JSON.stringify(visaArray));
        } else {
          console.log("data");
          let visaArray = JSON.parse(data);
          visaArray.push(output.data.data.vcVisaJwt);
          AsyncStorage.setItem("@visa_jwt_arr", JSON.stringify(visaArray));
        }
      });
      
      window.alert("발급되었습니다.");
      navVisa();
    }  
     


  
  };

  return (
    <Pressable>
      <Cover>
        <VisaText>비자 이름 : {visaRequestData.visa_name}</VisaText>
        <VisaText>비자 목적 : {visaRequestData.visa_purpose}</VisaText>
        <VisaText>비자 국가 : {visaRequestData.country_code}</VisaText>
        <VisaText>비자 유효일 : {visaRequestData.visa_expired_date}</VisaText>
        <VisaText>비자 신청일 : {visaRequestData.creation_date}</VisaText>
        {visaRequestData.success_yn === "1" ? (
          <Container onPress={getVisaVc}>
            <Title>비자 발급</Title>
          </Container>
        ) : null}
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserRequestVisa;
