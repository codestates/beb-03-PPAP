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
import { DelegateTypes, EthrDID } from 'ethr-did'
import "@ethersproject/shims"
import { JwtPresentationPayload, verifyCredential,createVerifiablePresentationJwt ,verifyPresentation} from "did-jwt-vc";
import { Issuer } from 'did-jwt-vc'
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const verifiedVC = async (payload)=>{
  payload= 'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0Ijp7ImNvdW50cnlDb2RlIjoiS09SIiwibmFtZSI6IktJTSBNSU4gU1UifX19LCJzdWIiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIiwibmJmIjoxNTYyOTUwMjgyLCJpc3MiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIn0.9FWaStG3XX0Loj8h8oa7yrdEfq-UKi_7rObWhWPqVycipZc3_cb1u8nV6pfEHHdneZ_e4ByQHJW30uyLNEiEmAA'
  const providerConfig = {
    name: "ganache",
    rpcUrl: "http://192.168.35.214:7545",
    registry: "0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8",
  };
  const ethrDidResolver = await getResolver(providerConfig);
  const didResolver:any = await new Resolver(ethrDidResolver);
  console.log("TEST")
  const verifiedVC = await verifyCredential('eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0Ijp7ImNvdW50cnlDb2RlIjoiS09SIiwibmFtZSI6IktJTSBNSU4gU1UifX19LCJzdWIiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4NWVmRUFhRTc4MkREMWMxNmUyZGI0NjE4OTA0ZUQzOTYwNjZhMEYwNiIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDVlZkVBYUU3ODJERDFjMTZlMmRiNDYxODkwNGVEMzk2MDY2YTBGMDYifQ.yunXtFNS5ty-vBZZnHUTGmROL2Hm635wKG2Au_-iWfpeVxvjfJweZuJtF7pCy9tA2eer3omDCsvisujmwFv1AQE', didResolver);
  console.log(verifiedVC);

  const ethrDid = new EthrDID({identifier: '0x5efEAaE782DD1c16e2db4618904eD396066a0F06', privateKey: '0bc990bb98af9946054526722c2f235230bf0f32e4cfac2fb1cd2df3cb37fd75',rpcUrl:providerConfig.rpcUrl,chainNameOrId:'ganache',registry:"0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8"}) as Issuer

  const vpPayload: JwtPresentationPayload = {
        vp: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation','VisaCredential'],
          PassportCredential: [payload],
        }
      }
  console.log("TEST")
  const vpjwt = await createVerifiablePresentationJwt(vpPayload,ethrDid);
   console.log(vpjwt);

   const verifiedVP = await verifyPresentation(vpjwt, didResolver);
   console.log(verifiedVP);
  return didResolver;
}
const Passport = ({ navigation }) => {
  const [hasPassport, setPassport] = useState(false);
  const [screenName, setScreenName] = useState("Passport");

  const setJwt = async (jwt) => {
    await AsyncStorage.setItem("@passport_jwt", jwt);
  };

  const clearJwt = async () => {
    await AsyncStorage.clear();
  };

  setJwt(
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0Ijp7ImNvdW50cnlDb2RlIjoiS09SIiwibmFtZSI6IktJTSBNSU4gU1UifX19LCJzdWIiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIiwibmJmIjoxNTYyOTUwMjgyLCJpc3MiOiJkaWQ6ZXRocjpyb3BzdGVuOjB4MDM3ZjIyNzE0NmJjZDBkYTc1MTY2NWJhM2I2NzJhZTUyYzMwNzAzOTM3ZTQyZTk0NGIwZWM5ODc3YjRlM2Q2ZjQwIn0.9FWaStG3XX0Loj8h8oa7yrdEfq-UKi_7rObWhWPqVycipZc3_cb1u8nV6pfEHHdneZ_e4ByQHJW30uyLNEiEmAA"
  );
  clearJwt();

  const userInfo = useSelector((state: any) => state.userReducer).data;
  if (userInfo) {
    const { accessToken, userData } = userInfo;

    const { did, phone_num }: { did: string; phone_num: string } =
      jwt_decode(accessToken);

    AsyncStorage.getItem("@passport_jwt").then(async (payload) => {
     
      if (payload === null) {
        console.log("여권 없음");
        setScreenName("PassportRegister");
        
        // 여권 발급 신청
        setPassport(false);

        verifiedVC(payload)
      } else {
        console.log("여권 있음");
        setScreenName("PassportDetailStack");
        // 여권 VC를 가져와야 함
      
        // const verifiedVC = await verifyCredential(payload, didResolver);
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
