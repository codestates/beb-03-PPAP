import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import { Spinner } from "../components";
import { useSelector } from "react-redux";

const Navigation = () => {
  const inProgress = useSelector((state) => state.spinnerReducer).data;

  return (
    <NavigationContainer>
      <MainTab />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
