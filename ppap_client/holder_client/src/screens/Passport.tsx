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
  payload= 'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJkaWQiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MDIwZmU2YWVjZWM2OTkzMmMxNWEwNTNlZTUwNmI0MmM5N2FhYWI4OGQ1YjgwM2RiMDJhNTI5ODU1NTMxMGIwYjI3IiwiY2xpZW50X2lkIjoxNiwiY291bnRyeV9jb2RlIjoiS09SIn19fSwic3ViIjoiZGlkOmV0aHI6Z2FuYWNoZToweDAyMGZlNmFlY2VjNjk5MzJjMTVhMDUzZWU1MDZiNDJjOTdhYWFiODhkNWI4MDNkYjAyYTUyOTg1NTUzMTBiMGIyNyIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDVlZkVBYUU3ODJERDFjMTZlMmRiNDYxODkwNGVEMzk2MDY2YTBGMDYifQ.S_-Cc-7tCz7hguEX4JpeJ6_-11xzPXY-KXl-7PKqxO8xDgck4sy_QVRv0w4w1j69cISq0PztMV_7M-H9cZsWHwE'
  const providerConfig = {
    name: "ganache",
    rpcUrl: "http://192.168.35.214:7545",
    registry: "0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8",
  };
  const ethrDidResolver = await getResolver(providerConfig);
  const didResolver:any = await new Resolver(ethrDidResolver);
  console.log("TEST")
  const verifiedVC = await verifyCredential(payload, didResolver);
  console.log(verifiedVC);
  const keypair = {
    address: '0xb37f5A408De02Cd222d1278d47b70F5FCd24D5c6',
    privateKey: '0x3b5362f8419f0f2e46bcf801d5f1b76a45fd23461635722a2ed2293297e29087',
    publicKey: '0x020fe6aecec69932c15a053ee506b42c97aaab88d5b803db02a5298555310b0b27',
    identifier: '0x020fe6aecec69932c15a053ee506b42c97aaab88d5b803db02a5298555310b0b27'
  };
   const ethrDid = new EthrDID({...keypair,rpcUrl:providerConfig.rpcUrl,chainNameOrId:'ganache',registry:"0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8"}) as Issuer

  const vpPayload: JwtPresentationPayload = {
        vp: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation','PassportCredential'],
          verifiableCredential: [payload],
        }
      }
  console.log("TEST")
  const vpjwt = await createVerifiablePresentationJwt(vpPayload,ethrDid);
   console.log(vpjwt);
  //  const verifiedVP = await verifyPresentation(vpjwt, didResolver);
  //  console.log(verifiedVP);
  // return didResolver;
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
    "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJkaWQiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MDIwZmU2YWVjZWM2OTkzMmMxNWEwNTNlZTUwNmI0MmM5N2FhYWI4OGQ1YjgwM2RiMDJhNTI5ODU1NTMxMGIwYjI3IiwiY2xpZW50X2lkIjoxNiwiY291bnRyeV9jb2RlIjoiS09SIn19fSwic3ViIjoiZGlkOmV0aHI6Z2FuYWNoZToweDAyMGZlNmFlY2VjNjk5MzJjMTVhMDUzZWU1MDZiNDJjOTdhYWFiODhkNWI4MDNkYjAyYTUyOTg1NTUzMTBiMGIyNyIsIm5iZiI6MTU2Mjk1MDI4MiwiaXNzIjoiZGlkOmV0aHI6Z2FuYWNoZToweDVlZkVBYUU3ODJERDFjMTZlMmRiNDYxODkwNGVEMzk2MDY2YTBGMDYifQ.S_-Cc-7tCz7hguEX4JpeJ6_-11xzPXY-KXl-7PKqxO8xDgck4sy_QVRv0w4w1j69cISq0PztMV_7M-H9cZsWHwE"
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
