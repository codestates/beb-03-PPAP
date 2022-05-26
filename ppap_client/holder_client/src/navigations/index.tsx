import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import { Spinner } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setPassportStatus } from "../modules/passportStatusReducer";
import { asyncGetItem } from "../utils/asyncStorage";

const Navigation = () => {
  const inProgress = useSelector((state) => state.spinnerReducer).data;
  const dispatch = useDispatch();

  asyncGetItem("@passportStatus").then((passportStatus) => {
    dispatch(setPassportStatus(passportStatus));
  });

  return (
    <NavigationContainer>
      <MainTab />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
