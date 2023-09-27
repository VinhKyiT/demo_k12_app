import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, View, DeviceEventEmitter } from 'react-native';
import Modal from 'react-native-modal';

const optionDefault = {
  title: '',
  content: '',
  hasCancel: true,
  confirmText: 'OK',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
  customContent: null,
  footerWrapperStyle: null,
  invertButtonColor: false,
  modalHeader: null,
  modalFooter: null,
  closeOnBackdropPress: false,
};

const CustomModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [option, setOption] = useState(optionDefault);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('MODAL_SHOW', options => {
      setIsVisible(true);
      setOption({ ...optionDefault, ...options });
    });
    return () => {
      listener.remove();
    };
  }, []);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onConfirm = () => {
    setIsVisible(false);
    setTimeout(() => {
      option.onConfirm && option.onConfirm();
    }, 200);
  };
  const onCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      option.onCancel && option.onCancel();
    }, 200);
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp" // Hiệu ứng khi mở Modal
        animationOut="slideOutDown" // Hiệu ứng khi đóng Modal
        onBackdropPress={toggleModal} // Đóng Modal khi chạm vào nền đen (Backdrop)
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={onConfirm}>
                <Text style={styles.textStyle}>{option.confirmText}</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={onCancel}>
                <Text style={styles.textStyle}>{option.cancelText}</Text>
              </Pressable>
            </View>
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

export const showModal = (options = optionDefault) => {
  DeviceEventEmitter.emit('MODAL_SHOW', options);
};
export const hideModal = (options = optionDefault) => {
  DeviceEventEmitter.emit('MODAL_HIDE', options);
};

export default CustomModal;
