import React from "react";
import { View, StyleSheet, Text, Pressable, Button } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import env from "../utils/envFile";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LabeledText from "./LabeledText";
import moment from "moment";
import MainButton from "./MainButton";

const Cover = styled.View`
  background-color: #fff;
  border: 3px solid ${({ theme }) => theme.navy};
  width: 300px;
  margin-bottom: 10px;
  justify-content: center;
  padding: 14px 24px;
  align-items: center;
`;

const Wrapper = styled.View`
  width: 100%;
`;

const Card = ({
  navVisa,
  visaRequestData,
}: {
  navVisa?: Function;
  visaRequestData?: object;
}) => {
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

    if (output.status === 200) {
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
        <Wrapper>
          <LabeledText label="비자 이름" text={visaRequestData.visa_name} />
          <LabeledText label="발급 목적" text={visaRequestData.visa_purpose} />
          <LabeledText
            label="발급 국가"
            text={visaRequestData.country_code}
            showIcon={true}
          />
          <LabeledText
            label="유효일자"
            text={visaRequestData.visa_expired_date}
          />
          <LabeledText
            label="신청일자"
            text={moment(visaRequestData.creation_date).format("YYYY. MM. DD")}
          />
        </Wrapper>

        {visaRequestData.success_yn === "1" && (
          <MainButton onPress={getVisaVc} title="비자 발급" />
        )}
      </Cover>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default Card;
