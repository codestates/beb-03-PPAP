import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import {LabeledText,MainText,VisaButton } from "../components"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EthrDID } from "ethr-did";
import env from "../utils/envFile";
import axios from "axios";
import {
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
  Issuer
} from "did-jwt-vc";
import { useSelector } from "react-redux";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  
`;

const ButtonContainer = styled.View`
  margin: 10px;
`;

const Wrapper = styled.View`
  justify-content: center;
  width: 50%;
  border: 3px;
  padding: 10px;
  border-radius: 10px;
  border-color: gray;
`;

const VisaDetail = ({ route, navigation }) => {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const {visaInfo} = route.params;
  const {visaIndex} = route.params;
  
  //출입국 VP 신청
  async function storeVP(did, vpJwt, address) {
    const output =  await axios
      .post(`${env.server}/admin/storeVp`,{
        did,
        vpJwt,
        countryCode:visaInfo.country_code,
        address
      });
      return output;
  }

  async function immigationVPcreate(){
    try{
      const passportVC = await AsyncStorage.getItem('@passport_jwt');
      const keypairString:any = await AsyncStorage.getItem('@key_pair');
      const visaVCString:any = await AsyncStorage.getItem("@visa_jwt_arr");
      const userDid =  userInfo.userData.did;
      if(passportVC!==null && keypairString!=null){

        let keypair = JSON.parse(keypairString);
        let visaVC = JSON.parse(visaVCString)[visaIndex];

        console.log('-------------------------');
        console.log(userDid);
        console.log(passportVC);
        console.log(keypair);
        console.log(visaVC);
        console.log('-------------------------');
        const providerConfig = {
          name: "ganache",
          rpcUrl: env.rpcUrl,
          registry: env.registry,
        };
        const ethrDid = new EthrDID({...keypair,rpcUrl:providerConfig.rpcUrl,chainNameOrId:'ganache',registry:env.registry}) as Issuer
        const vpPayload: JwtPresentationPayload = {
              vp: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation','ImmigrationCredential'],
                verifiableCredential: [passportVC,visaVC],
              }
            }

        const vpjwt = await createVerifiablePresentationJwt(vpPayload,ethrDid);
        const storeOutput = await storeVP(userDid,vpjwt,keypair.address);
        
        if(storeOutput.status===200){
          window.alert("요청에 성공하였습니다.")
        }
      }else{
        //에러 띄우기
      }
     
    }catch(err){

    }
  }

  

  return (
    <Container>
      <MainText title="비자 발급 정보" />
      <Wrapper>
        <LabeledText label="성명" text={visaInfo.user_name} />
        <LabeledText label="성별" text={visaInfo.sex} />
        <LabeledText label="생년월일" text={visaInfo.birth} />
        <LabeledText label="나이" text={visaInfo.age} />
        <LabeledText label="비자 발급 국가" text={visaInfo.target_country_code} />
        <LabeledText label="비자 이름" text={visaInfo.visa_name} />
        <LabeledText label="비자 목적" text={visaInfo.visa_purpose} />
        <LabeledText label="비자 유효기간" text={visaInfo.visa_expired_date} />
      </Wrapper>

      <ButtonContainer>
        <VisaButton title="출입국 요청" onPress={immigationVPcreate} width="50%" />
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default VisaDetail;
