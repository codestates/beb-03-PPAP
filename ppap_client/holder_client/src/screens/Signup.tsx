import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { validateEmail, removeWhitespace } from "../utils/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, Input } from "../componenets";
import { images } from "../utils/Images";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: red;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ppap-f8b5b.appspot.com/o/profile%2Fphoto.png?alt=media"
  );

  useEffect(() => {
    let _errorMessage = "";
    if (!name) {
      _errorMessage = "이름을 입력하세요";
    } else if (!validateEmail(email)) {
      _errorMessage = "올바른 이메일을 입력하세요";
    } else if (password.length < 6) {
      _errorMessage = "비밀번호는 적어도 6자 이상이어야 합니다";
    } else if (password !== passwordConfirm) {
      _errorMessage = "비밀번호가 일치하지 않습니다";
    } else {
      _errorMessage = "";
    }
    setErrorMessage(_errorMessage);
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSinupButtonPress = () => {};

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={(url) => {
            console.log(url);
            setPhotoUrl(url);
            console.log(photoUrl);
          }}
        />
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
          }}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(removeWhitespace(text))}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(removeWhitespace(text))}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Input
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSinupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
