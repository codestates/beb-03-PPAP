import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import env from "../utils/envFile";
import { images } from "../utils/images";
import { MainText, Image, Stamp } from "../components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex-direction: row;
  padding: 30px;
  flex: 1;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Stamps = () => {
  const [stampNftList, setStampNftList] = useState([]);
  // const [stampNftList, setStampNftList] = useState([
  //   {
  //     timeStamp: new Date(),
  //     Immigration: "entrance",
  //     countryCode: "KOR",
  //     countryImg: `${images.flag}%2FKOR.png?alt=media`,
  //   },
  //   {
  //     timeStamp: new Date(),
  //     Immigration: "entrance",
  //     countryCode: "KOR",
  //     countryImg: `${images.flag}%2FKOR.png?alt=media`,
  //   },
  // ]);

  useEffect(() => {
    getStampNft();
  }, []);

  useEffect(() => {
    console.log(stampNftList);
    console.log("CHANGE");
  }, [stampNftList]);

  async function getStampNft() {
    const keypairString: any = await AsyncStorage.getItem("@keypair");
    let keypair = JSON.parse(keypairString);
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

  return (
    <Container>
      <MainText title="출입국도장" />
      <Wrapper>
        {stampNftList.map((stampNft, idx) => (
          <Stamp
            key={idx}
            url={stampNft.countryImg}
            timeStamp={stampNft.timeStamp}
            Immigration={stampNft.Immigration === "departure" ? "출국" : "입국"}
            countryCode={stampNft.countryCode}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Stamps;
