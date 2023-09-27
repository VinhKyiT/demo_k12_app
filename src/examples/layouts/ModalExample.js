import { View, Text } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '~components/CustomButton';
import Modal from 'react-native-modal';

const ModalExample = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <CustomButton title="Open Modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp" // Hiệu ứng khi mở Modal
        animationOut="slideOutDown" // Hiệu ứng khi đóng Modal
        onBackdropPress={toggleModal} // Đóng Modal khi chạm vào nền đen (Backdrop)
      >
        <View>
          <Text>Modal Content</Text>
          <CustomButton title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ModalExample;
