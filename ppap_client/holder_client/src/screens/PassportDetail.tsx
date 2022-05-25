import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import env from "../utils/envFile";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const PassportDetail = ({ navigation, route }) => {
  const [stampNftList, setStampNftList] = useState([]);

  //출입국 NFT 도장 가져오기
  async function getStampNft() {
    const keypairString: any = await AsyncStorage.getItem("@key_pair");
    let keypair = JSON.parse(keypairString);
    const output = await axios.get(
      `${env.server}/holder/getStampNFTs?address=${keypair.address}`,
      {},
    );
    const nftTokenList = output.data.NFT_list;
    
    let stampList = nftTokenList.map(async(data)=>{
      const output = await axios.get(
        data.token_uri,
        {},
      );
      return output.data;
    })

    const _stampList: any = await Promise.all(stampList);


    setStampNftList(_stampList);
  }

  useEffect(() => {
    getStampNft();
  },[]);

  useEffect(() => {
    console.log(stampNftList)
   console.log("CHANGE")
  },[stampNftList]);

  async function immigationVPcreate() {}

  /* Moralis init code */
  return (
    <Container>
      <Text>PassportDetail</Text>

    </Container>
  );
};

const styles = StyleSheet.create({});

export default PassportDetail;
