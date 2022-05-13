import React, { useState } from "react";
import styled from "styled-components/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button, Text } from "@react-native-material/core";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

export const Mail = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <Container>
      <StyledText>Mail</StyledText>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
    </Container>
  );
};

export const Meet = () => {
  return (
    <Container>
      <StyledText>Meet</StyledText>
    </Container>
  );
};

export const Settings = () => {
  return (
    <Container>
      <StyledText>Settings</StyledText>
    </Container>
  );
};
