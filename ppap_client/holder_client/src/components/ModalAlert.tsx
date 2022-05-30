import React from "react";
import { View, StyleSheet, Text, Modal, Alert, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const Button = styled.Pressable`
  border-radius: 20px;
  padding: 8px 30px;
  background-color: ${({ theme }) => theme.navy};
`;

const ModalBox = styled.View``;

const ModalAlert = ({
  modalVisible,
  messageText,
  onCloseText,
  onPress,
}: {
  modalVisible: boolean;
  messageText: string;
  onCloseText: string;
  onPress: Function;
}) => {
  return (
    <Container>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        {/* <View style={styles.centeredView}> */}
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{messageText}</Text>
          <Button onPress={onPress}>
            <Text style={styles.textStyle}>{onCloseText}</Text>
          </Button>
        </View>
        {/* </View> */}
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 60,
    backgroundColor: "white",
    paddingVertical: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalAlert;
