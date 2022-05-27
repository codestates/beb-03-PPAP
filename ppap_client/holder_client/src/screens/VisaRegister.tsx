import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import env from "../utils/envFile";
import RNPickerSelect from "react-native-picker-select";
import { Image, MainText, MainButton, LabeledText, Flag } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Issuer,
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
} from "did-jwt-vc";
import { EthrDID } from "ethr-did";
import { images } from "../utils/images";

const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
`;
const Wrapper = styled.View`
  /* justify-content: center; */
  /* align-items: center; */
`;

const VisaRegister = ({ navigation }) => {
  const [visaList, setVisaList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [purposeList, setPurposeList] = useState([]);
  const [country, setCountry] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [visa, setVisa] = useState(null);
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const passportStatus = useSelector(
    (state) => state.passportStatusReducer,
  ).data;
  console.log(`VisaRegister passportStatus ${passportStatus}`);

  useEffect(() => {
    getVisalist().then((data: any) => {
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

  async function getVisalist() {
    const output = await axios.get(`${env.server}/holder/getAvailVisa`);
    return output.data;
  }

  async function requestVisa() {
    AsyncStorage.getItem("@passport_jwt").then(async (data) => {
      console.log(data);
      if (data === null) {
        console.log("여권없음");
      } else {
        console.log("여권 있음");

        // vp로 만들어서 전송
        const passportvp = await makeVp(data);
        try {
          const output = await axios.post(
            `${env.server}/holder/reqVisa`,
            {
              visa_purpose: purpose,
              target_country: country,
              vpPassJwt: passportvp,
            },
            {
              headers: {
                authorization: userInfo.accessToken,
              },
              validateStatus: function (status) {
                return status >= 200 && status < 500;
              },
            },
          );

          //성공
          if (output.status === 200) {
            window.alert("발급 신청에 성공했습니다. 발급이력을 확인해보세요.");
            navigation.navigate("VisaRequestList");
          }
        } catch (e) {
          console.log(e);
          window.alert("발급에 실패하였습니다.\n" + e);
        }
      }
    });
  }

  function makeVp(passportvc) {
    return AsyncStorage.getItem("@keypair").then(async (data) => {
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

  return (
    <Container>
      <Wrapper>
        <MainText title="비자 신청" />
      </Wrapper>

      <Wrapper style={{ width: 250 }}>
        <RNPickerSelect
          onValueChange={(value) => setCountry(value)}
          items={countryList.map((elem) => {
            return { label: elem, value: elem };
          })}
          style={pickerSelectStyles.style}
          placeholder={{
            label: "발급 국가",
          }}
        />
        <RNPickerSelect
          onValueChange={(value) => {
            setPurpose(value);
          }}
          items={purposeList.map((elem) => {
            return { label: elem, value: elem };
          })}
          style={pickerSelectStyles.style}
          placeholder={{
            label: "비자 종류",
          }}
        />
      </Wrapper>
      {visa ? (
        <>
          <Wrapper style={{ width: 220 }}>
            <LabeledText label="비자 이름" text={visa.visa_name} />
            <LabeledText label="비자 목적" text={visa.visa_purpose} />
            <LabeledText
              label="국가"
              text={visa.country_code}
              showIcon={true}
            />
            <LabeledText label="유효일" text={visa.visa_expired_date} />
          </Wrapper>
          <MainButton
            title="신청하기"
            onPress={() => {
              requestVisa();
            }}
            width="50%"
            disabled={passportStatus !== "2" || !userInfo} // 유랑님 도와주세요!!
          />
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16 }}>발급가능한 비자가 없습니다.</Text>
          <Image url={images.error} />
        </>
      )}
    </Container>
  );
};

const pickerSelectStyles = StyleSheet.create({
  style: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default VisaRegister;
