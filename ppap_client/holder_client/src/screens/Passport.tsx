import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { UserPassport } from "../components";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { DelegateTypes, EthrDID } from "ethr-did";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  JwtPresentationPayload,
  verifyCredential,
  createVerifiablePresentationJwt,
} from "did-jwt-vc";
import didJWT from "did-jwt";
import { Issuer } from "did-jwt-vc";
import { Wallet } from "@ethersproject/wallet";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const verifiedVC = async (payload) => {
  payload =
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0Ijp7ImNvdW50cnlDb2RlIjoiS09SIiwibmFtZSI6IktJTSBNSU4gU1UifX19LCJzdWIiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIiwibmJmIjoxNTYyOTUwMjgyLCJpc3MiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIn0.9FWaStG3XX0Loj8h8oa7yrdEfq-UKi_7rObWhWPqVycipZc3_cb1u8nV6pfEHHdneZ_e4ByQHJW30uyLNEiEmAA";
  const providerConfig = {
    name: "ganache",
    rpcUrl: "http://192.168.1.132:7545",
    registry: "0x15CD7F5b57718b17eD0CacF3386aAad54C65a234",
  };
  const ethrDidResolver = await getResolver(providerConfig);
  const didResolver: any = await new Resolver(ethrDidResolver);
  console.log("TEST");
  const verifiedVC = await verifyCredential(
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJ1c2VyX25hbWUiOiJIT05HIEdJTERPTkciLCJjb3VudHJ5X2NvZGUiOiJLT1IiLCJhZ2UiOiIxOCIsInNleCI6Ik0iLCJiaXJ0aCI6IjE5OTIwMTAxIiwicGVyc29uYWxfaWQiOiIwNDA2MTcxMDAwMDAwIiwiZGlkIjoiZGlkOmV0aHI6Z2FuYWNoZToweDAyZDk0MTcwNTdmMWE5YWE4MzA3YTg4N2ZjNWJiMTQ5OTY2NmRlM2UxMGM2YWZmZDdlYjlmNWY2Njk4YTM2ZjczNyIsInBob3RvX3VyaSI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc2ODI4ODMxMDIyLWNhNDFkMzkwNWZiNz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTAyMyZxPTgwIiwiY3JlYXRpb25fZGF0ZSI6IjIwMjItMDUtMTIgMDU6NTE6MjMifX19LCJzdWIiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MkQ2QTNGMGNFNjRBN2M5RjQzRGE5YjI4MjUzQ0E1NmQxOTJmODIxZSIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDczNzYyNTI3NTM1MjMzQ0RhRjkwODU4QTJEMUM5ODI0M2E3QzNFNzEifQ.8kDho0Ya2p5HJ_UGmzLmb-zUOrtDbwLtaoTsWohI9nAxlwUkeSN4Xd4BRH_hm1TpHcUQp-XInlt5DCJt-fs15gE",
    didResolver
  );
  const vpPayload = {
    vp: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiablePresentation", "passportCredential"],
      verifiableCredential: [
        "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJ1c2VyX25hbWUiOiJIT05HIEdJTERPTkciLCJjb3VudHJ5X2NvZGUiOiJLT1IiLCJhZ2UiOiIxOCIsInNleCI6Ik0iLCJiaXJ0aCI6IjE5OTIwMTAxIiwicGVyc29uYWxfaWQiOiIwNDA2MTcxMDAwMDAwIiwiZGlkIjoiZGlkOmV0aHI6Z2FuYWNoZToweDAyZDk0MTcwNTdmMWE5YWE4MzA3YTg4N2ZjNWJiMTQ5OTY2NmRlM2UxMGM2YWZmZDdlYjlmNWY2Njk4YTM2ZjczNyIsInBob3RvX3VyaSI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc2ODI4ODMxMDIyLWNhNDFkMzkwNWZiNz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTAyMyZxPTgwIiwiY3JlYXRpb25fZGF0ZSI6IjIwMjItMDUtMTIgMDU6NTE6MjMifX19LCJzdWIiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MkQ2QTNGMGNFNjRBN2M5RjQzRGE5YjI4MjUzQ0E1NmQxOTJmODIxZSIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDczNzYyNTI3NTM1MjMzQ0RhRjkwODU4QTJEMUM5ODI0M2E3QzNFNzEifQ.8kDho0Ya2p5HJ_UGmzLmb-zUOrtDbwLtaoTsWohI9nAxlwUkeSN4Xd4BRH_hm1TpHcUQp-XInlt5DCJt-fs15gE",
      ],
    },
  };
  // console.log(verifiedVC);
  // let decoded = didJWT.decodeJWT(payload)
  const rpcUrl = "http://192.168.35.214:7545";
  var provider: any = new ethers.providers.JsonRpcProvider(rpcUrl);
  const txSigner = new Wallet(
    "0xb4bcb7cb0ea3362468467c63924cacac64952bb8269a9caac71e904b03b623c6",
    provider
  ); //해당 계정의 개인키

  const key = {
    address: "0xF91D2F9296d226F03248C0ACCB63E08c5fc0BC3c",
    privateKey:
      "0xb4bcb7cb0ea3362468467c63924cacac64952bb8269a9caac71e904b03b623c6",
    publicKey:
      "0x037f227146bcd0da751665ba3b672ae52c30703937e42e944b0ec9877b4e3d6f40",
    identifier:
      "0x037f227146bcd0da751665ba3b672ae52c30703937e42e944b0ec9877b4e3d6f40",
  };
  const holder = new EthrDID({
    txSigner,
    provider,
    ...key,
    rpcUrl,
    chainNameOrId: "ropsten",
    registry: "0xD9e9Ab5b298cA794c6f3Dc57EFd40CD32fAB2104",
  }) as Issuer;
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, holder);
  // const vpPayload: JwtPresentationPayload = {
  //         vp: {
  //           '@context': ['https://www.w3.org/2018/credentials/v1'],
  //           type: ['VerifiablePresentation','VisaCredential'],
  //           PassportCredential: [payload],
  //         }
  //       }
  //   console.log("TEST")
  //   console.log(createVerifiablePresentationJwt(payload,holder));
  //console.log(didResolver);
  return didResolver;
};
const Passport = ({ navigation }) => {
  const setJwt = async (jwt) => {
    await AsyncStorage.setItem("@passport_jwt", jwt);
  };

  setJwt(
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0Ijp7ImNvdW50cnlDb2RlIjoiS09SIiwibmFtZSI6IktJTSBNSU4gU1UifX19LCJzdWIiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIiwibmJmIjoxNTYyOTUwMjgyLCJpc3MiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIn0.9FWaStG3XX0Loj8h8oa7yrdEfq-UKi_7rObWhWPqVycipZc3_cb1u8nV6pfEHHdneZ_e4ByQHJW30uyLNEiEmAA"
  );

  const userInfo = useSelector((state: any) => state.userReducer).data;
  if (userInfo) {
    const { accessToken, userData } = userInfo;

    const { did, phone_num }: { did: string; phone_num: string } =
      jwt_decode(accessToken);

    AsyncStorage.getItem("@passport_jwt").then(async (payload) => {
      if (payload === null) {
        console.log("여권 없음");
        // 여권 발급 신청
      } else {
        console.log("여권 있음");
        // startGanacheServerAndDeployEthrDidRegistry();
        // 여권 VC를 가져와야 함
        console.log(verifiedVC(payload));
        //let decoded = didJWT.decodeJWT(payload)
        //console.log(decoded)
      }
    });

    // axios
    //   .get("https://ppap.loca.lt/clientAuth/getPassportVC", {
    //     params: { phoneNum: phone_num },
    //   })
    //   .then((payload) => {
    //     console.log(payload.data);
    //     if (payload.data.data) {
    //       // const {};

    //     }
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  }

  return (
    <Container>
      <UserPassport
        onPress={() => navigation.navigate("PassportDetailStack")}
        mainText={userInfo ? "DID 여권" : "로그인을 진행해주세요"}
        subText={userInfo ? userInfo.userData.user_name : ""}
        isLogined={!!userInfo}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Passport;
