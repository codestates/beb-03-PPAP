import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import axios from "axios";
import env from "../utils/envFile";
import { UserRequestVisa, LabeledText } from "../components";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const VisaRequestList = () => {
  const [requestVisaList, setRequestVisaList] = useState([]);
  const userInfo = useSelector((state: any) => state.userReducer).data;

  async function reqVisaList() {
    return await axios
      .get(`${env.server}/holder/getReqVisaList`, {
        headers: { authorization: userInfo.accessToken },
      })
      .then((data) => data.data.data.reqVisaList);
  }

  useEffect(() => {
    reqVisaList().then((data) => {
      setRequestVisaList(data);
    });
  }, []);

  useEffect(() => {
    console.log("신청내역 : ", requestVisaList);
  }, [requestVisaList]);

  return (
    <Container>
      <Text>VisaRequestList</Text>
      {requestVisaList.length !== 0
        ? requestVisaList.map((data) => {
            return (
              <UserRequestVisa
                visaRequestData={data}
                key={data.visa_survey_id}
              />
            );
          })
        : null}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaRequestList;
