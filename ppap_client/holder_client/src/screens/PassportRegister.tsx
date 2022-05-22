import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { images } from "../utils/images";
import { Image, MainText, MainButton } from "../components";
import { useSelector } from "react-redux";
import { LabeledText } from "../components";

const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.View`
  justify-content: center;
`;

const PassportRegister = ({ routes }) => {
  const [photoUrl, setPhotoUrl] = useState(images.photo);
  const [errorMsg, setErrorMsg] = useState("사진을 선택해 주세요");
  const userInfo = useSelector((state) => state.userReducer).data;
  const { userData } = userInfo;

  const passportRegisterBtnHandler = () => {
    console.log("버튼 클릭");
  };

  const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    color: red;
  `;

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
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PassportRegister;
