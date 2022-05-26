import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import env from "../utils/envFile";
import { Card, MainText } from "../components";
import { setSpinnerStatus } from "../modules/spinnerReducer";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const VisaRequestList = ({ navigation }) => {
  const [requestVisaList, setRequestVisaList] = useState([]);
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const spinner = useSelector((state: any) => state.spinnerReducer).data;
  const dispatch = useDispatch();

  async function reqVisaList() {
    dispatch(setSpinnerStatus(true));
    return await axios
      .get(`${env.server}/holder/getReqVisaList`, {
        headers: { authorization: userInfo.accessToken },
      })
      .then((data) => {
        if (data.data.data != null) {
          dispatch(setSpinnerStatus(false));
          return data.data.data.reqVisaList;
        } else {
          dispatch(setSpinnerStatus(false));
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

  function navVisa() {
    navigation.navigate("Visa");
  }

  return (
    <Container>
      {!spinner && (
        <>
          {requestVisaList.length !== 0 ? (
            requestVisaList.map((data) => {
              return (
                <Card
                  navVisa={navVisa}
                  visaRequestData={data}
                  key={data.visa_survey_id}
                />
              );
            })
          ) : (
            <Text style={{ fontSize: 16 }}>신청내역이 없습니다.</Text>
          )}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaRequestList;
