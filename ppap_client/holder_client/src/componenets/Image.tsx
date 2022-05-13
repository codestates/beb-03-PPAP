import React, { useEffect } from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const Container = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.ImageBackground`
  width: 100px;
  height: 100px;
`;

const ButtonContainer = styled.Pressable`
  background-color: #aaa;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  flex: 1;
  jusify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
  name: "photo-camera",
  size: 20,
})`
  color: #fff;
  margin-top: 4px;
`;

const PhotoButton = ({ onPress }: { onPress?: boolean }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Image = ({
  url,
  imageStyle,
  rounded,
  showButton,
  onChangeImage,
}: {
  url?: string;
  imageStyle?: object;
  rounded?: boolean;
  showButton?: boolean;
  onChangeImage?: Function;
}) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if (status !== "granted") {
            Alert.alert(
              "Photo Permission",
              "Please turn on the camera roll permissions."
            );
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (e) {
      Alert.alert("Photo Error", e.message);
    }
  };

  return (
    <Container>
      <StyledImage
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={imageStyle}
        imageStyle={rounded ? { borderRadius: 50 } : { borderRadius: 0 }}
      >
        {showButton && <PhotoButton onPress={_handleEditButton} />}
      </StyledImage>
    </Container>
  );
};

export default Image;
