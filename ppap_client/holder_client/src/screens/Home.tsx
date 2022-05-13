import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* background-color: #fff; */
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = ({ navigation }) => {
  return (
    <Container>
      <StyledText>Home</StyledText>
      <Button
        title="go to the list screen"
        onPress={() => navigation.navigate("List")}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;
