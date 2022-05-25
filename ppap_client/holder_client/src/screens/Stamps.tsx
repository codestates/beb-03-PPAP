import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import env from "../utils/envFile";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Stamps = () => {
  const [stampNftList, setStampNftList] = useState([]);
  async function getStampNft() {
    const keypairString: any = await AsyncStorage.getItem("@keypair");
    let keypair = JSON.parse(keypairString);
    console.log(keypair);
    const output = await axios.get(
      `${env.server}/holder/getStampNFTs?address=${keypair.address}`,
      {},
    );
    const nftTokenList = output.data.NFT_list;

    let stampList = nftTokenList.map(async (data) => {
      const output = await axios.get(data.token_uri, {});
      return output.data;
    });

    const _stampList: any = await Promise.all(stampList);

    setStampNftList(_stampList);
  }

  useEffect(() => {
    getStampNft();
  }, []);

  useEffect(() => {
    console.log(stampNftList);
    console.log("CHANGE");
  }, [stampNftList]);
  return (
    <Container>
      <Text>출입국도장</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Stamps;
