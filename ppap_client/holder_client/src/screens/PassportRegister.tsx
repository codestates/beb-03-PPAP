import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";
import { Image, MainText, MainButton, LabeledText } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setSpinnerStatus } from "../modules/spinnerReducer";
import { setPassportStatus } from "../modules/passportStatusReducer";
import axios from "axios";
import env from "../utils/envFile";
import { uploadImage } from "../utils/firebase";
import { asyncSetItem } from "../utils/asyncStorage";

const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.View`
  justify-content: center;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  color: red;
`;

const PassportRegister = ({ routes, navigation }) => {
  const [photoUrl, setPhotoUrl] = useState(images.photo);
  const [errorMsg, setErrorMsg] = useState("사진을 선택해 주세요");
  const userInfo = useSelector((state) => state.userReducer).data;
  const { userData, accessToken } = userInfo;
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(!!errorMsg);
  }, [errorMsg]);

  const passportRegisterBtnHandler = async () => {
    console.log("버튼 클릭");
    dispatch(setSpinnerStatus(true));
    const { user_id } = userData;
    const photo_uri = await uploadImage(photoUrl, user_id);
    try {
      const response = await axios.post(
        `${env.server}/holder/reqPass`,
        { photo_uri },
        {
          headers: { Authorization: accessToken },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        },
      );
      const { msg, data } = response.data;
      console.log(msg);
      if (msg === "Your request is sucessfully submitted") {
        asyncSetItem("@passportStatus", "1"); // null: 신청 전 / "1": 신청 후 대기 / "2": 발급
        dispatch(setPassportStatus(1));
        navigation.navigate("ConfirmAlert", {
          mainText: "여권 신청을 완료했습니다",
        });
      } else if (
        msg === "Your request is already transfered and not approved"
      ) {
        setErrorMsg("여권이 이미 신청되었습니다");
      }
      dispatch(setSpinnerStatus(false));
    } catch (e) {
      console.error(`에러 발생 ${e}`);
    }
  };

  return (
    <Container>
      <MainText title="여권 신청" />

      <Wrapper>
        <Image
          url={photoUrl}
          isUpload={true}
          onChangeImage={(url) => {
            setPhotoUrl(url);
            setErrorMsg("");
          }}
          isPassport={true}
        />
        <ErrorText>{errorMsg}</ErrorText>
        <LabeledText label="성명" text={userData.user_name} />
        <LabeledText label="생년월일" text={userData.user_birth} />
        <LabeledText label="휴대폰 번호" text={userData.phone_num} />
      </Wrapper>
      <MainButton
        title="신청하기"
        onPress={passportRegisterBtnHandler}
        width="50%"
        disabled={disabled}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PassportRegister;
