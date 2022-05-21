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
// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { verifyCredential } from "did-jwt-vc";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Passport = ({ navigation }) => {
  const [hasPassport, setPassport] = useState(false);
  const [screenName, setScreenName] = useState("Passport");

  const setJwt = async (jwt) => {
    await AsyncStorage.setItem("@passport_jwt", jwt);
  };

  const clearJwt = async () => {
    await AsyncStorage.clear();
  };

  // setJwt(
  //   "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJ1c2VyX25hbWUiOiJIT05HIEdJTERPTkciLCJjb3VudHJ5X2NvZGUiOiJLT1IiLCJhZ2UiOiIxOCIsInNleCI6Ik0iLCJiaXJ0aCI6IjE5OTIwMTAxIiwicGVyc29uYWxfaWQiOiIwNDA2MTcxMDAwMDAwIiwiZGlkIjoiZGlkOmV0aHI6Z2FuYWNoZToweDAyZDk0MTcwNTdmMWE5YWE4MzA3YTg4N2ZjNWJiMTQ5OTY2NmRlM2UxMGM2YWZmZDdlYjlmNWY2Njk4YTM2ZjczNyIsInBob3RvX3VyaSI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc2ODI4ODMxMDIyLWNhNDFkMzkwNWZiNz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTAyMyZxPTgwIiwiY3JlYXRpb25fZGF0ZSI6IjIwMjItMDUtMTIgMDU6NTE6MjMifX19LCJzdWIiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MkQ2QTNGMGNFNjRBN2M5RjQzRGE5YjI4MjUzQ0E1NmQxOTJmODIxZSIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDczNzYyNTI3NTM1MjMzQ0RhRjkwODU4QTJEMUM5ODI0M2E3QzNFNzEifQ.8kDho0Ya2p5HJ_UGmzLmb-zUOrtDbwLtaoTsWohI9nAxlwUkeSN4Xd4BRH_hm1TpHcUQp-XInlt5DCJt-fs15gE"
  // );
  clearJwt();

  const userInfo = useSelector((state) => state.userReducer).data;
  if (userInfo) {
    const { accessToken, userData } = userInfo;

    const { did, phone_num }: { did: string; phone_num: string } =
      jwt_decode(accessToken);

    AsyncStorage.getItem("@passport_jwt").then(async (payload) => {
      const providerConfig = {
        name: "ganache",
        rpcUrl: "http://localhost:7545",
        registry: "0x5EBCF79f9dB9ef642e0E5Ac96b6D0Fed15b7681c",
      };
      const ethrDidResolver = await getResolver(providerConfig);
      const didResolver = await new Resolver(ethrDidResolver);
      if (payload === null) {
        console.log("여권 없음");
        setScreenName("PassportRegister");
        // 여권 발급 신청
        setPassport(false);
      } else {
        console.log("여권 있음");
        setScreenName("PassportDetailStack");
        // 여권 VC를 가져와야 함
        console.log(payload);
        // const verifiedVC = await verifyCredential(payload, didResolver);
        // console.log(verifiedVC);
        // console.log(didResolver);
        setPassport(true);
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
        onPress={() => navigation.navigate(screenName)}
        mainText={
          userInfo
            ? hasPassport
              ? "DID 여권"
              : "여권을 신청하세요"
            : "로그인을 진행해주세요"
        }
        subText={userInfo && hasPassport ? userInfo.userData.user_name : ""}
        isValidPassport={!!userInfo && hasPassport}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Passport;
