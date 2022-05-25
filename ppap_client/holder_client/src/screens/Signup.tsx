import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { Input, MainButton, MainText } from "../components";
import {
  removeWhitespace,
  isValidPhoneNumber,
  isValidBirth,
} from "../utils/common";
import { useDispatch } from "react-redux";
import { setSpinnerStatus } from "../modules/spinnerReducer";
import axios from "axios";
import env from "../utils/envFile";
import { asyncSetItem, asyncGetItem } from "../utils/asyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Wrapper = styled.View`
  margin-top: 30px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  color: red;
`;

const Signup = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birth, setBirth] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const [datePickerShow, setdatePickerShow] = useState(false);

  useEffect(() => {
    let _errorMsg = "";
    if (!userName) {
      _errorMsg = "이름을 입력하세요";
    } else if (!isValidPhoneNumber(phoneNum)) {
      _errorMsg = "올바른 휴대폰 번호를 입력하세요";
    } else if (password.length < 4) {
      _errorMsg = "비밀번호는 적어도 4자 이상이어야 합니다";
    } else if (password !== passwordConfirm) {
      _errorMsg = "비밀번호가 일치하지 않습니다";
    } else if (!isValidBirth(birth)) {
      _errorMsg = "올바른 생년월일을 입력하세요";
    } else {
      _errorMsg = "";
    }
    setErrorMsg(_errorMsg);
  }, [userName, phoneNum, password, passwordConfirm, birth]);

  useEffect(() => {
    setDisabled(
      !(
        userName &&
        phoneNum &&
        birth &&
        password &&
        passwordConfirm &&
        !errorMsg
      ),
    );
  }, [userName, password, phoneNum, birth, passwordConfirm, errorMsg]);

  const onChangeDate = (event, selectedDate) => {
    moment.locale("ko");
    setdatePickerShow(Platform.OS === "ios");
    setBirth(moment(selectedDate).format("YYYYMMDD"));
  };

  const signUpBtnClickHandler = () => {
    console.log(userName, phoneNum, password, passwordConfirm);
    dispatch(setSpinnerStatus(true));
    axios
      .post(
        `${env.clientServer}/clientAuth/register`,
        {
          user_name: userName,
          password,
          phone_num: phoneNum,
          user_birth: birth,
        },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        },
      )
      .then((payload) => {
        const { data, msg } = payload.data;
        const { keypair, userData } = data;
        asyncSetItem("@keypair", JSON.stringify(keypair));
        console.log(keypair);

        dispatch(setSpinnerStatus(false));
        if (msg === "Your data already exists!") {
          setErrorMsg("이미 가입된 회원입니다");
        } else {
          navigation.navigate("ConfirmAlert", {
            mainText: "회원 가입을 완료했습니다",
          });
        }
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <MainText title="회원 가입" />

        <Wrapper>
          <Input
            label="이름"
            maxLength={15}
            onChangeText={(text) => setUserName(removeWhitespace(text))}
            isUpperCase={true}
            placeholder="대문자로 입력"
          />
          <Input
            label="휴대폰 번호"
            maxLength={15}
            onChangeText={(text) => setPhoneNum(removeWhitespace(text))}
            placeholder="- 을 빼고 입력"
          />
          <Pressable
            onPress={() => {
              setdatePickerShow(true);
            }}
          >
            <Input
              label="생년월일"
              maxLength={8}
              placeholder="날짜 선택"
              value={birth}
            />
          </Pressable>
          {datePickerShow && (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Input
            label="비밀번호"
            isPassword={true}
            maxLength={20}
            onChangeText={(text) => setPassword(removeWhitespace(text))}
            placeholder="4자리 이상 입력"
          />
          <Input
            label="비밀번호 확인"
            isPassword={true}
            maxLength={20}
            onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          />

          <ErrorText>{errorMsg}</ErrorText>
        </Wrapper>
        <MainButton
          title="회원가입"
          onPress={signUpBtnClickHandler}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default Signup;
