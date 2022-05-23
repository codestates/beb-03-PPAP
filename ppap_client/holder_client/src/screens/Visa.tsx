import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";
import { MainButton, UserVisa, VisaButton } from "../components";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  bottom: -10%;
`;
const Visa = ({ navigation }) => {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const [hasVisa, setVisa] = useState(false);
  const [screenName, setScreenName] = useState("Visa");

  // visa VC 저장
  // const someArray = ["asfdadfs", "aklsjhdflja"];
  // AsyncStorage.setItem("@visa_jwt", JSON.stringify(someArray))
  //   .then((json) => console.log("success!"))
  //   .catch((error) => console.log("error!"));
  
  useEffect(() => {
    navigation.navigate(screenName)
  }, [screenName]);

  AsyncStorage.getItem("@visa_jwt").then(async (data) => {
    if (data === null) {
      console.log("비자 없음!!")
      // 비자 신청
      setVisa(false);

    } else {
      console.log("비자 있음");
      let output = JSON.parse(data);
      output.push("asdfasdfsasfdasdfasdfaf");
      AsyncStorage.setItem("@visa_jwt", JSON.stringify(output));
      AsyncStorage.getItem("@visa_jwt").then(async (data) => {
        console.log(data);
      });
    }
  });

  return (
    <Container>
      <UserVisa
        onPress={() =>  {setScreenName("VisaDetail")}}
        mainText={userInfo && hasVisa ? "Visa" : "비자를 신청하세요"}
        subText={userInfo && hasVisa ? userInfo.userData.user_name : ""}
        isValidPassport={!!userInfo && hasVisa}
      />
      <ButtonContainer >
      <VisaButton
        title="신청하기"
        onPress={() => {
          console.log("비자 신청하기");
          setScreenName("VisaRegister");
        }}
        width="50%"
      />
      <VisaButton
        title="신청 내역 조회"
        onPress={() => {
          console.log("비자 신청 내역 조회");
          setScreenName("VisaRequestList")
        }}
        width="50%"
      />
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Visa;
