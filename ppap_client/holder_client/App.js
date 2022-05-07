import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState("기본입니다");

  useEffect(() => {
    axios
      .get(`https://ppap.loca.lt`)
      .then((payload) => {
        console.log(payload.data);
        setData(payload.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "black",
          fontSize: 20,
        }}
      >
        {data}
      </Text>

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
