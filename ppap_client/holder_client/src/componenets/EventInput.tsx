import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const EventInput = () => {
  const [text, setText] = useState("");
  const _onChange = (event: any) => {
    console.log(event);
    setText(event.nativeEvent.text);
  };
  const _onChangeText = (text: string) => {
    console.log(text);
    setText(text);
  };
  return (
    <View>
      <Text style={{ margin: 10, fontSize: 30 }}>text: {text}</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, fontSize: 20 }}
        placeholder="Enter a text..."
        onChangeText={_onChangeText}
      />
    </View>
  );
};

export default EventInput;
