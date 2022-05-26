import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { MainButton, UserVisa, VisaButton, Portable } from "../components";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyCredential } from "did-jwt-vc";
import env from "../utils/envFile";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
`;

const Wrapper = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 3%;
  width: 100%;
  justify-content: space-evenly;
`;
const Visa = ({ navigation }) => {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const [hasVisa, setVisa] = useState(false);
  const [screenName, setScreenName] = useState("Visa");
  const [visaList, setVisaList] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const [visaDetailIndex, setVisaDetailIndex] = useState(-1);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  useEffect(() => {
    getVisaVC();
  }, [screenName]);

  useEffect(() => {
    //Visa detail을 눌렀을때
    if (visaDetailIndex !== -1) {
      console.log("여기?");
      navigation.navigate(screenName, {
        visaInfo: visaList[visaDetailIndex],
        visaIndex: visaDetailIndex,
      });
    }
    //다른걸 눌렀을때
    else {
      navigation.navigate(screenName);
    }
  }, [clickCheck]);

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
          const output = await resolveVisaVC(elem);
          console.log("AAAAAAAAAA");
          console.log(output.payload.vc.credentialSubject.visa);
          return output.payload.vc.credentialSubject.visa;
        });

        const visavc: any = await Promise.all(visaVCArray);

        setVisaList(visavc);
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

    return verifiedVC;
  }

  return (
    <Container>
      <ScrollView
        horizontal
        pagingEnabled={true}
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        {visaList.length === 0 || !userInfo ? (
          <View
            style={{
              width: SCREEN_WIDTH,
              alignItems: "center",
            }}
          >
            <Portable
              onPress={() => {
                setScreenName("VisaRegister");
                setClickCheck(!clickCheck);
              }}
              mainText={hasVisa ? "로그인을 진행하세요" : "비자를 신청하세요"}
              isValid={false}
            />
          </View>
        ) : (
          visaList.map((elem, index) => {
            return (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  alignItems: "center",
                }}
                key={index}
              >
                <Portable
                  onPress={() => {
                    setScreenName(`VisaDetail`);
                    setVisaDetailIndex(index);
                    setClickCheck(!clickCheck);
                  }}
                  mainText={elem.visa_name}
                  subText={elem.visa_purpose}
                  countryCode={elem.target_country_code}
                  isValid={true}
                  type="visa"
                />
              </View>
            );
          })
        )}
      </ScrollView>

      <Wrapper>
        <MainButton
          title="신청하기"
          onPress={() => {
            console.log("비자 신청하기");
            setScreenName("VisaRegister");
            setClickCheck(!clickCheck);
          }}
          width="40%"
        />
        {!!userInfo && (
          <MainButton
            title="신청 내역 조회"
            onPress={() => {
              console.log("비자 신청 내역 조회");
              setScreenName("VisaRequestList");
              setClickCheck(!clickCheck);
            }}
            width="40%"
          />
        )}
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Visa;
