import React from "react";
import { View, StyleSheet, Text, Pressable, Button } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";
import { MainButton } from "../components/MainButton";
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
  align-items: center;
`;

const VisaCreationDate = styled.Text`
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
  width: props.width || "70%",
}))`
  align-items: center;
  /* width: 70%; */
  margin: 20px;
  bottom: -40%;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.lightgray : theme.navy};
`;

const UserRequestVisa = ({ visaRequestData }: { visaRequestData?: object }) => {
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
    AsyncStorage.getItem("@visa_jwt_arr").then(async (data) => {
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

    // visa VC 저장
    // const visaArray = ["asfdadfs", "aklsjhdflja"];
    AsyncStorage.getItem("@visa_jwt_arr").then((json) => {
      console.log(json);
    });
  };

  return (
    <Pressable>
      <Cover>
        <VisaCreationDate>
          발급 신청일 : {visaRequestData.creation_date}
        </VisaCreationDate>
        {visaRequestData.success_yn === "1" ? (
          <Container onPress={getVisaVc}>
            <Title>비자 발급</Title>
          </Container>
        ) : null}
        <Text style={{ color: "#fff" }}></Text>
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserRequestVisa;
