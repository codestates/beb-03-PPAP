import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { UserPassport } from "../components";
import jwt_decode from "jwt-decode";
import {
  asyncSetItem,
  asyncGetItem,
  asyncRemoveItem,
  asyncClear,
} from "../utils/asyncStorage";
import "@ethersproject/shims";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

// asyncClear();

const Passport = ({ navigation }) => {
  const [screenName, setScreenName] = useState("Passport");
  const userInfo = useSelector((state) => state.userReducer).data;
  const passportStatus = useSelector(
    (state) => state.passportStatusReducer,
  ).data;
  console.log(`Passport passportStatus ${passportStatus}`);

  useEffect(() => {
    if (userInfo) {
      asyncGetItem("@passportStatus").then((passportStatus) => {
        console.log(`Passport @passportStatus ${passportStatus}`);
        if (passportStatus === null) {
          setScreenName("PassportRegister");
        } else {
          setScreenName("PassportDetailStack");
        }
      });
    }
  }, [userInfo, passportStatus]);

  return (
    <Container>
      <UserPassport
        onPress={() => navigation.navigate(screenName)}
        mainText={
          !!userInfo
            ? !!passportStatus
              ? "DID 여권"
              : "여권을 신청해 주세요"
            : "로그인을 진행해주세요"
        }
        subText={
          !!userInfo && !!passportStatus ? userInfo.userData.user_name : ""
        }
        isValidPassport={!!userInfo && !!passportStatus}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Passport;

