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

const VisaRequestList = ({navigation}) => {
  const [requestVisaList, setRequestVisaList] = useState([]);
  const userInfo = useSelector((state: any) => state.userReducer).data;

  async function reqVisaList() {
    return await axios
      .get(`${env.server}/holder/getReqVisaList`, {
        headers: { authorization: userInfo.accessToken },
      })
      .then((data) => {
        if(data.data.data!=null){
          return data.data.data.reqVisaList
        }else{
          return [];
        }
      });
  }

  useEffect(() => {
    reqVisaList().then((data) => {
      setRequestVisaList(data);
    });
  }, []);

  useEffect(() => {
    console.log("신청내역 : ", requestVisaList);
  }, [requestVisaList]);

  function navVisa(){
    navigation.navigate("Visa");
  }

  return (
    <Container>
     
      {requestVisaList.length !== 0
        ? requestVisaList.map((data) => {
            return (
              <UserRequestVisa navVisa={navVisa}
                visaRequestData={data}
                key={data.visa_survey_id}
              />
            );
          })
        :  <Text>신청내역이 없습니다.</Text>}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaRequestList;
