import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const Container = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.ImageBackground`
  width: ${({ isPassport }) => (isPassport ? "140px" : "100px")};
  height: ${({ isPassport }) => (isPassport ? "180px" : "100px")};
`;

const Image = ({
  url,
  isUpload,
  onChangeImage,
  isPassport,
}: {
  url: string;
  isUpload?: boolean;
  onChangeImage?: Function;
  isPassport?: boolean;
}) => {
  if (isUpload) {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if (status !== "granted") {
            Alert.alert(
              "Photo Permission",
              "Please turn on the camera roll permissions.",
            );
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }

  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        onChangeImage!(result.uri);
      }
    } catch (e) {
      Alert.alert("Photo Error", e.message);
    }
  };

  return (
    <Container>
      <Pressable
        onPress={() => {
          isUpload ? _handleEditButton() : "";
        }}
      >
        <StyledImage
          source={{
            uri: url,
          }}
          isUpload={isUpload}
          isPassport={isPassport}
        />
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Image;
