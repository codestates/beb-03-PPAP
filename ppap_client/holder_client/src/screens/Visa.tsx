import React, { useState } from "react";
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

const Visa = ({ navigation }) => {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const [hasVisa, setVisa] = useState(false);
  const [screenName, setScreenName] = useState("Visa");

  // visa VC 저장
  // const someArray = ["asfdadfs", "aklsjhdflja"];
  // AsyncStorage.setItem("@visa_jwt", JSON.stringify(someArray))
  //   .then((json) => console.log("success!"))
  //   .catch((error) => console.log("error!"));

  AsyncStorage.getItem("@visa_jwt").then(async (data) => {
    if (data === null) {
      console.log("비자 없음");
      setScreenName("VisaRegister");
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
        onPress={() => navigation.navigate(screenName)}
        mainText={"Visa"}
        subText={userInfo && hasVisa ? userInfo.userData.user_name : ""}
        isValidPassport={!!userInfo && hasVisa}
      />
      <VisaButton
        title="신청하기"
        onPress={() => {
          console.log("비자 신청하기");
          navigation.navigate(screenName);
        }}
        width="50%"
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Visa;
