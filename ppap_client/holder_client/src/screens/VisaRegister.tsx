import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import env from "../utils/envFile";
import RNPickerSelect from "react-native-picker-select";
import { Image, MainText, MainButton, LabeledText } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Issuer,
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
  verifyCredential,
} from "did-jwt-vc";
import { EthrDID } from "ethr-did";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const Wrapper = styled.View`
  justify-content: center;
`;
const VisaRegister = () => {
  const [visaList, setVisaList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [purposeList, setPurposeList] = useState([]);
  const [country, setCountry] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [visa, setVisa] = useState(null);
  const userInfo = useSelector((state: any) => state.userReducer).data;
  // 나중에 삭제 ****
  const passportvc =
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJkaWQiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MDIyMjAwNDI0Mjk1ZjZjY2UxOTk0NjA4ZTRhNTA0MDFjZmU2MjU1MjAwM2ZlNjJkNDA4ZWEzYzZjNmM4OGNlNjViIiwicGhvdG9fdXJpIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzIxNzA1NzkyOTctMjgxOTE4YzhhZTcyP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmbT1qcGcmaXhsaWI9cmItMS4yLjEmcT04MCZyYXdfdXJsPXRydWUmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTIwODQiLCJjcmVhdGlvbl9kYXRlIjoiMjAyMi0wNS0yM1QwNToxNDo1OC4wMDBaIiwibW9kaWZpZWRfZGF0ZSI6IjIwMjItMDUtMjNUMDU6MTQ6NTguMDAwWiIsInVzZXJfbmFtZSI6IkIiLCJjb3VudHJ5X2NvZGUiOiJLT1IiLCJhZ2UiOjIxLCJzZXgiOiJNIiwiYmlydGgiOiIxOTA0NTAyNCIsInBob25lX251bSI6IjAxMDEwMTAxMDE0IiwicGVyc29uYWxfaWQiOm51bGx9fX0sInN1YiI6ImRpZDpldGhyOmdhbmFjaGU6MHgwMjIyMDA0MjQyOTVmNmNjZTE5OTQ2MDhlNGE1MDQwMWNmZTYyNTUyMDAzZmU2MmQ0MDhlYTNjNmM2Yzg4Y2U2NWIiLCJuYmYiOjE1NjI5NTAyODIsImlzcyI6ImRpZDpldGhyOmdhbmFjaGU6MHg1ZWZFQWFFNzgyREQxYzE2ZTJkYjQ2MTg5MDRlRDM5NjA2NmEwRjA2In0.1jnc6uHDkdzvbpFvFuK16M8Kq1ryroEOMxugCmKFM8wwhVnxyUcFAzB0Lnai51dKMY4eGIVTdH4FjkDf11k4DAE";
  AsyncStorage.setItem("@passport_jwt", passportvc)
    .then((json) => console.log("success!"))
    .catch((error) => console.log("error!"));

  const keypair = {
    address: "0xBf1607600d1505e77ff44777816aEaf989f6f156",
    privateKey:
      "0x846c0afdee562fea0798bdac05d34248dd1c77cd6cf54866766bf5bfdc087b31",
    publicKey:
      "0x022200424295f6cce1994608e4a50401cfe62552003fe62d408ea3c6c6c88ce65b",
    identifier:
      "0x022200424295f6cce1994608e4a50401cfe62552003fe62d408ea3c6c6c88ce65b",
  };

  AsyncStorage.setItem("@key_pair", JSON.stringify(keypair))
    .then((json) => console.log("success!"))
    .catch((error) => console.log("error!"));
  // 나중에 삭제 ****
  async function getVisalist() {
    const output = await axios.get(`${env.server}/holder/getAvailVisa`);
    // console.log(output.data);
    return output.data;
  }

  async function requestVisa() {
    const auth = "Authorization";
    AsyncStorage.getItem("@passport_jwt").then(async (data) => {
      if (data === null) {
        console.log("여권없음");
      } else {
        console.log("여권 있음");
        // vp로 만들어서 전송
        const passportvp = await makeVp(data);
        try {
          console.log("$$$$$$$$$$$", passportvp);
          console.log(`${env.server}/holder/reqVisa`);
          // const output = await axios.get(`${env.server}/holder/getAvailVisa`, {
          //   headers: { authorization: userInfo.accessToken },
          // });
          const output = await axios.post(
            `${env.server}/holder/reqVisa`,
            {
              visa_purpose: purpose,
              target_country: country,
              vpPassJwt: passportvp,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: userInfo.accessToken,
              },
            },
          );

          console.log(output);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  function makeVp(passportvc) {
    const providerConfig = {
      name: "ganache",
      rpcUrl: env.rpcUrl,
      registry: env.registry,
    };

    return AsyncStorage.getItem("@key_pair").then(async (data) => {
      if (data === null) {
        console.log("키페어 X");
      } else {
        console.log("키페어 O");
        let keypair = JSON.parse(data);
        console.log(keypair);
        const ethrDid = new EthrDID({
          ...keypair,
          rpcUrl: env.rpcUrl,
          chainNameOrId: "ganache",
          registry: env.registry,
        }) as Issuer;

        const vpPayload: JwtPresentationPayload = {
          vp: {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            type: ["VerifiablePresentation", "PassportCredential"],
            verifiableCredential: [passportvc],
          },
        };
        const vpjwt = await createVerifiablePresentationJwt(vpPayload, ethrDid);
        return vpjwt;
      }
    });
  }

  useEffect(() => {
    getVisalist().then((data: any) => {
      // console.log(data.data);
      setVisaList(data.data.rawData);
      setCountryList(data.data.countryList);
      setPurposeList(data.data.purposeList);
    });
  }, []);
  useEffect(() => {
    if (country && purpose) {
      let curVisa = visaList.filter((elem: any) => {
        return elem.visa_purpose === purpose && elem.country_code === country;
      });
      console.log(curVisa);
      setVisa(curVisa[0]);
    }
  }, [country, purpose]);

  return (
    <Container>
      <RNPickerSelect
        onValueChange={(value) => setCountry(value)}
        items={countryList.map((elem) => {
          return { label: elem, value: elem };
        })}
      />
      <RNPickerSelect
        onValueChange={(value) => {
          setPurpose(value);
        }}
        items={purposeList.map((elem) => {
          return { label: elem, value: elem };
        })}
      />

      {/* "visa_name": "2022 VISA",
                "visa_purpose": "TOUR",
                "country_code": "KOR",...
                "visa_expired_date": "90" */}
      {visa ? (
        <Wrapper>
          <LabeledText label="비자 이름" text={visa.visa_name} />
          <LabeledText label="비자 목적" text={visa.visa_purpose} />
          <LabeledText label="국가" text={visa.country_code} />
          <LabeledText label="유효일" text={visa.visa_expired_date} />
          <MainButton
            title="신청하기"
            onPress={() => {
              requestVisa();
            }}
            width="50%"
          />
        </Wrapper>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaRegister;
