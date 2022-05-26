import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { SubButton, MainText } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { unsetUser } from "../modules/userReducer";
import { unsetPassportStatus } from "../modules/passportStatusReducer";
import { asyncClear } from "../utils/asyncStorage";
import axios from "axios";
import env from "../utils/envFile";
import { setSpinnerStatus } from "../modules/spinnerReducer";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userReducer).data;

  const logout = () => {
    dispatch(unsetUser());
    dispatch(unsetPassportStatus());
    navigation.navigate("PassportStack");
  };

  // const resignation = async () => {
  //   dispatch(setSpinnerStatus(true));

  //   try {
  //     const response = await axios.post(
  //       `${env.server}/holder/reqPass`,
  //       { userData: userInfo },
  //       {
  //         validateStatus: function (status) {
  //           return status >= 200 && status < 500;
  //         },
  //       },
  //     );
  //     console.log(response);
  //     dispatch(unsetUser());
  //     dispatch(unsetPassportStatus());
  //     asyncClear();
  //     // navigation.popToTop();
  //     dispatch(setSpinnerStatus(false));
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <Container>
      <MainText title="마이페이지" />
      <SubButton title="로그아웃" onPress={logout} />
      {/* <SubButton title="회원탈퇴" onPress={resignation} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
