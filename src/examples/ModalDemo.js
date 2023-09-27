import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import CustomButton from '~components/CustomButton';
import Modal from 'react-native-modal';
import { hideModal, showModal } from '~components/Modal';

const ModalExample = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <CustomButton
        title="Open Modal"
        onPress={() =>
          showModal({
            onConfirm: () => {
              console.log('confirm pressed');
              showModal({
                onConfirm: () => {
                  console.log('confirm pressed');
                  hideModal();
                },
              });
            },
          })
        }
      />
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp" // Hiệu ứng khi mở Modal
        animationOut="slideOutDown" // Hiệu ứng khi đóng Modal
        onBackdropPress={toggleModal} // Đóng Modal khi chạm vào nền đen (Backdrop)
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={toggleModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalExample;
