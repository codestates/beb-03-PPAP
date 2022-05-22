import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { removeWhitespace, isValidName } from "../utils/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MainButton, SubButton, Input, MainText } from "../components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../modules/userReducer";
import { setSpinnerStatus } from "../modules/spinnerReducer";

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

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setDisabled(!(userName && password && !errorMsg));
  }, [userName, password]);

  const userNameChangeHandler = (name) => {
    const changed = removeWhitespace(name);
    setUserName(changed);
    setErrorMsg(isValidName(changed) ? "" : "이름을 확인하세요.");
  };

  const passwordChangeHandler = (password) => {
    setPassword(removeWhitespace(password));
    setErrorMsg(password ? "" : "비밀번호를 입력하세요.");
  };

  const loginBtnClickHandler = () => {
    console.log(userName, password);
    dispatch(setSpinnerStatus(true));
    axios
      .post("https://rare-seahorse-92.loca.lt/clientAuth/login", {
        user_name: userName,
        password,
      })
      .then((payload) => {
        const { data, msg } = payload.data;
        // console.log(data, msg);
        dispatch(setSpinnerStatus(false));
        if (msg === "Login success!") {
          dispatch(setUser(data));
          navigation.navigate("PassportStack");
        } else if (msg === "Wrong username or no data exists!") {
          setErrorMsg("잘못된 로그인 정보입니다");
        } else if (msg === "Wrong password!") {
          setErrorMsg("잘못된 로그인 정보입니다");
        } else {
          setErrorMsg("잘못된 로그인 정보입니다");
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <MainText title="로그인" />
        <Wrapper>
          <Input
            label="이름"
            maxLength={15}
            onChangeText={userNameChangeHandler}
            isUpperCase={true}
          />
          <Input
            label="비밀번호"
            isPassword={true}
            maxLength={20}
            onChangeText={passwordChangeHandler}
          />
          <ErrorText>{errorMsg}</ErrorText>
        </Wrapper>
        <MainButton
          title="로그인"
          onPress={loginBtnClickHandler}
          disabled={disabled}
        />
        <SubButton
          title="회원가입"
          onPress={() => navigation.navigate("Signup")}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default Login;
