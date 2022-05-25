import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import Navigation from "./navigations";
import styled from "styled-components/native";
import { createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import "../shim";

const Container = styled.View`
  flex: 1;
`;

const store = createStore(rootReducer);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container onLayout={onLayoutRootView}>
          <Navigation />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
