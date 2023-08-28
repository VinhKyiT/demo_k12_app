import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { DEFAULT_OPTIONS } from './configs';

const ModalNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [option, setOption] = useState(DEFAULT_OPTIONS);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('MODAL_SHOW', options => {
      setIsVisible(true);
      setOption({ ...DEFAULT_OPTIONS, ...options });
    });
    return () => {
      listener.remove();
    };
  }, []);
  const onConfirm = () => {
    setIsVisible(false);
    setTimeout(() => {
      option.onConfirm && option.onConfirm();
    }, 600);
  };
  const onCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      option.onCancel && option.onCancel();
    }, 600);
  };
  return (
    <Modal
      statusBarTranslucent
      animationIn={'zoomIn'}
      animationInTiming={400}
      isVisible={isVisible}
      onBackdropPress={option.closeOnBackdropPress ? () => setIsVisible(false) : () => null}
      style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        {option?.modalHeader ? (
          typeof option.modalHeader === 'function' ? (
            <View style={styles.modalHeader}>{option.modalHeader()}</View>
          ) : (
            <View style={styles.modalHeader}>{option.modalHeader}</View>
          )
        ) : null}
        <View style={styles.modalBody}>
          <Text color={'#333'} size="XL" weight={'bold'} style={{ marginBottom: 4 }}>
            {option?.title}
          </Text>
          {option.content ? (
            <Text size="L" style={styles.notiContent}>
              {option.content}
            </Text>
          ) : null}
          {option.customContent ? option?.customContent : null}
        </View>
        <View style={[styles.modalButtonArea, option?.footerWrapperStyle]}>
          {option.hasCancel && (
            <TouchableOpacity
              onPress={onCancel}
              disableIfNoInternet={false}
              throttleTime={0}
              title={option.cancelText}
              textStyle={option.invertButtonColor ? styles.confirmText : styles.cancelTxt}
              containerStyle={
                option.invertButtonColor
                  ? styles.confirmBtn(option.hasCancel)
                  : styles.cancelBtn(option.hasCancel)
              }
            />
          )}
          <TouchableOpacity
            onPress={onConfirm}
            title={option.confirmText}
            disableIfNoInternet={false}
            throttleTime={0}
            textStyle={option.invertButtonColor ? styles.cancelTxt : styles.confirmText}
            containerStyle={
              option.invertButtonColor
                ? styles.cancelBtn(option.hasCancel)
                : styles.confirmBtn(option.hasCancel)
            }
          />
        </View>
        {option?.modalFooter ? (
          typeof option.modalFooter === 'function' ? (
            <View style={styles.modalFooter}>{option.modalFooter()}</View>
          ) : (
            <View style={styles.modalFooter}>{option.modalFooter}</View>
          )
        ) : null}
      </View>
    </Modal>
  );
};
export const showModal = (options = DEFAULT_OPTIONS) => {
  DeviceEventEmitter.emit('MODAL_SHOW', options);
};
export const hideModal = (options = DEFAULT_OPTIONS) => {
  DeviceEventEmitter.emit('MODAL_HIDE', options);
};

export default React.memo(ModalNotification);
