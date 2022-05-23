import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";
import { MainButton, UserVisa, VisaButton } from "../components";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  JwtPresentationPayload,
  verifyCredential,
  createVerifiablePresentationJwt,
  verifyPresentation,
} from "did-jwt-vc";
import { Issuer } from "did-jwt-vc";
import env from "../utils/envFile";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  bottom: -10%;
`;
const Visa = ({ navigation }) => {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const [hasVisa, setVisa] = useState(false);
  const [screenName, setScreenName] = useState("Visa");
  const [visaList, setVisaList] = useState([]);

  // visa VC 저장
  // const someArray = ["asfdadfs", "aklsjhdflja"];
  // AsyncStorage.setItem("@visa_jwt", JSON.stringify(someArray))
  //   .then((json) => console.log("success!"))
  //   .catch((error) => console.log("error!"));

  useEffect(() => {
    navigation.navigate(screenName);
    getVisaVC();
    // console.log(visaList);
  }, [screenName]);

  useEffect(() => {
    console.log(visaList);
  }, [visaList]);

  async function getVisaVC() {
    AsyncStorage.getItem("@visa_jwt_arr").then(async (data) => {
      if (data === null) {
        console.log("비자 없음!!");
        // 비자 신청
        setVisa(false);
      } else {
        console.log("비자 있음");
        setVisa(true);
        let output = JSON.parse(data);

        let visaVCArray = output.map(async (elem) => {
          // console.log()
          const output = await resolveVisaVC(elem);
          // console.log(output.payload.vc.credentialSubject.visa;
          return output.payload.vc.credentialSubject.visa;
        });

        const visavc: any = await Promise.all(visaVCArray);
        setVisaList(visavc);
        // console.log("-------------------------");
        // console.log(visaList);
        // console.log("-------------------------");
      }
    });
  }

  async function resolveVisaVC(visaVcJwt) {
    const providerConfig = {
      name: "ganache",
      rpcUrl: env.rpcUrl,
      registry: env.registry,
    };
    const ethrDidResolver = await getResolver(providerConfig);
    const didResolver: any = await new Resolver(ethrDidResolver);
    const verifiedVC = await verifyCredential(visaVcJwt, didResolver);
    // console.log(verifiedVC);
    return verifiedVC;
  }

  return (
    <Container>
      {visaList.map((elem) => {
        return (
          <UserVisa
            onPress={() => {
              setScreenName("VisaDetail");
            }}
            mainText={userInfo && hasVisa ? "Visa" : "비자를 신청하세요"}
            subText={userInfo && hasVisa ? userInfo.userData.user_name : ""}
            isValidVisa={!!userInfo && hasVisa}
          />
        );
      })}

      <ButtonContainer>
        <VisaButton
          title="신청하기"
          onPress={() => {
            console.log("비자 신청하기");
            setScreenName("VisaRegister");
          }}
          width="50%"
        />
        <VisaButton
          title="신청 내역 조회"
          onPress={() => {
            console.log("비자 신청 내역 조회");
            setScreenName("VisaRequestList");
          }}
          width="50%"
        />
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Visa;
