import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import { API_KEY } from "@env";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
moment.locale("ko");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState<any[]>([]);

  const icons = {
    Clouds: "cloud",
    Rain: "cloud-rain",
    Clear: "sun",
  };

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const place = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    if (place[0] !== undefined) {
      setCity(`${place[0].country} ${place[0].district}`);
      console.log(city);
    }

    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly&appid=${API_KEY}&units=metric`
    );
    setDays(weather.data.daily);
  };

  useEffect(() => {
    ask();
    axios.get("https://ppap.loca.lt/issuer/getPass").then((payload) => {
      console.log(payload.data.msg);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size={60} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text>{moment(day.dt * 1000).format("ll")}</Text>
              <Text style={styles.temp}>{parseInt(day.temp.day)}°</Text>
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name={icons[day.weather[0].main]}
                  size={42}
                  color="black"
                  style={{ paddingRight: 20 }}
                />
                <Text style={styles.description}>{day.weather[0].main}</Text>
              </View>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {},
  cityName: {
    color: "black",
    fontSize: 24,
    fontWeight: "800",
  },
  day: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    marginTop: 10,
    fontSize: 128,
  },
  description: {
    marginTop: -20,
    fontSize: 42,
  },
  tinyText: {
    fontSize: 18,
  },
});
