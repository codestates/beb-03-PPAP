import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { setPassportStatus } from "../modules/passportStatusReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  MainText,
  Image,
  LabeledText,
  MessageAlert,
  MainButton,
} from "../components";
import axios from "axios";
import env from "../utils/envFile";
import { asyncGetItem, asyncSetItem } from "../utils/asyncStorage";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { verifyCredential } from "did-jwt-vc";
import { setSpinnerStatus } from "../modules/spinnerReducer";

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex-grow: ${({ type }) => (type === "header" ? "1" : "3")};
  justify-content: ${({ type }) =>
    type === "content" ? "flex-start" : "center"};
`;

const PassportDetail = ({ navigation, route }) => {
  const [passportInfo, setPassportInfo] = useState({});
  const [seconds, setSeconds] = useState(0);
  const userInfo = useSelector((state) => state.userReducer).data;
  const { userData, accessToken } = userInfo;
  const dispatch = useDispatch();

  const passportStatus = useSelector(
    (state) => state.passportStatusReducer,
  ).data;
  console.log(`Passport passportStatus ${passportStatus}`);

  useEffect(() => {
    if (passportStatus < 2) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        axios
          .get(`${env.server}/holder/getReqPass`, {
            headers: { Authorization: accessToken },
            validateStatus: function (status) {
              return status >= 200 && status < 500;
            },
          })
          .then((payload) => {
            const { data, msg } = payload.data;
            setPassportInfo(data.reqPass);
            const { success_yn } = passportInfo;
            console.log(`PassportDetail success_yn ${success_yn}`);
            if (success_yn === "1") {
              asyncSetItem("@passportStatus", "2");
              dispatch(setPassportStatus(2));
            }
          })
          .catch((e) => console.error(e));
      }, 5000);
      return () => clearInterval(interval);
    } else {
      asyncGetItem("@passport_jwt").then((vcJwt) => {
        if (vcJwt === null) {
          getPassportVC();
        } else {
          setVerifiedPassportVC(vcJwt); // vc?????? ????????? ?????? ?????? ?????? ??????
        }
      });
    }
  }, []);

  const setVerifiedPassportVC = async (vcJwt) => {
    const providerConfig = {
      name: "ganache",
      rpcUrl: env.rpcUrl,
      registry: env.registry,
    };
    const ethrDidResolver = await getResolver(providerConfig);
    const didResolver: any = await new Resolver(ethrDidResolver);
    const verifiedVC = await verifyCredential(vcJwt, didResolver);

    const { payload: vcPayload } = verifiedVC;
    setPassportInfo(vcPayload.vc.credentialSubject.passportInfo);

    return didResolver;
  };

  const getPassportVC = () => {
    axios
      .get(`${env.server}/holder/issuePassVC`, {
        headers: { Authorization: accessToken },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      })
      .then((payload) => {
        const { data, msg } = payload.data;
        asyncSetItem("@passport_jwt", data.vcPassJwt);
        console.log("?????? jwt ??????");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container>
      <Wrapper type="header">
        <MainText title="?????? ??????" />
        {passportStatus !== "2" && <MessageAlert message="?????? ??????" />}
      </Wrapper>
      <Wrapper type="content">
        <Image url={passportInfo.photo_uri} isPassport={true} />
        <LabeledText label="??????" text={passportInfo.user_name} />
        <LabeledText
          label="??????"
          text={passportInfo.country_code}
          showIcon={true}
        />
        <LabeledText label="????????????" text={passportInfo.birth} />
        <LabeledText label="??????" text={passportInfo.sex} />
        <LabeledText label="????????????" text={passportInfo.phone_num} />
        <LabeledText
          label="DID"
          text={passportInfo?.did?.substr(0, 12) + "???"}
        />
      </Wrapper>
      <Wrapper
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        {passportStatus === "2" && (
          <MainButton
            title="????????? ??????"
            onPress={() => navigation.navigate("Stamps")}
            width="40%"
          />
        )}
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PassportDetail;
