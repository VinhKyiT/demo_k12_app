import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import Modal from 'react-native-modal';
import { FONTS } from '~constants/fonts';
import AppButton from '../AppButton';
import AppText from '../AppText';
import styles from './styles';

const defaultOptions = {
  title: '',
  content: '',
  hasCancel: false,
  cancelText: 'Cancel',
  onCancel: () => {},
  confirmText: 'OK',
  onConfirm: () => {},
  closeModalOnBackdropPress: false,
  customContent: null,
};

const AppModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('MODAL_SHOW', userOptions => {
      setModalVisible(true);
      setOptions({ ...defaultOptions, ...userOptions });
    });
    return () => {
      listener.remove();
    };
  }, []);

  const onConfirm = () => {
    setModalVisible(false);
    options.onConfirm();
  };

  const onCancel = () => {
    setModalVisible(false);
    options.onCancel();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp" // Hiệu ứng khi mở Modal
        animationOut="slideOutDown" // Hiệu ứng khi đóng Modal
        onBackdropPress={toggleModal} // Đóng Modal khi chạm vào nền đen (Backdrop)
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: '#EDEDED',
                width: '100%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
              }}>
              <AppText style={styles.modalHeaderText}>{options.title}</AppText>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 16 }}>
              {options.customContent ? (
                options.customContent
              ) : (
                <AppText style={styles.modalText}>{options.content}</AppText>
              )}
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              {!!options.hasCancel && (
                <AppButton
                  style={{ backgroundColor: 'transparent' }}
                  title={options.cancelText}
                  onPress={onCancel}
                />
              )}
              <AppButton
                titleStyle={{ color: '#fff', fontFamily: FONTS.BOLD, fontSize: 16 }}
                style={{ backgroundColor: '#FA4A0C', paddingVertical: 8, borderRadius: 99 }}
                title={options.confirmText}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const showModal = userOptions => {
  DeviceEventEmitter.emit('MODAL_SHOW', userOptions);
};

export default AppModal;