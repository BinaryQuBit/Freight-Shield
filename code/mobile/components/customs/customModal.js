// React Imports
import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

// Start of the Build
export default function CustomModal({
  modalVisible,
  setModalVisible,
  children,
  animationType,
  paddingVertical,
}) {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={[styles.modalView, { paddingVertical: paddingVertical }]}
            >
              <ScrollView>{children}</ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "90%",
    marginBottom: 20,
    elevation: 3,
    padding: 20,
    maxHeight: "80%",
  },
});
