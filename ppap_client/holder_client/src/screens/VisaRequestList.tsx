import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import axios from "axios";
import env from "../utils/envFile";
import { UserRequestVisa, LabeledText} from "../components";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  overflow: auto;
`;

const VisaRequestList = () => {
  const [requestVisaList, setRequestVisaList] = useState([]);
const userInfo = useSelector((state: any) => state.userReducer).data;

  async function reqVisaList(){
    return await axios.get(`${env.server}/holder/getReqVisaList`,{
      headers: { "authorization": userInfo.accessToken }
    }).then((data)=>data.data.data.reqVisaList)
   
  }

  useEffect(() => {
    reqVisaList().then((data)=>{
      setRequestVisaList(data);
    });
  }, []);

  useEffect(() => {
    console.log(requestVisaList);
  }, [requestVisaList]);

  return (
    <Container>
      <Text>VisaRequestList</Text>
      {requestVisaList.map((data)=>{
        return (<UserRequestVisa visaRequestData={data}/>)
      })}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaRequestList;
