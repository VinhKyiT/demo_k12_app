import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { showModal } from '~components/AppModal';
import CustomButton from '~components/CustomButton';
import { I18n } from '~i18n';

const ModalExample = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <View>
      <CustomButton
        title="Open Modal"
        onPress={() => {
          if (!isDisplayed) {
            showModal({
              title: 'Thông báo',
              content: 'Đây là nội dung thông báo',
              hasCancel: true,
              cancelText: I18n.t('cancel'),
              onCancel: () => {
                console.log('Nhấn vào nút cancel');
              },
              confirmText: I18n.t('confirm'),
              onConfirm: () => {
                setIsDisplayed(true);
              },
            });
          }
        }}
      />
    </View>
  );
};

export default ModalExample;
