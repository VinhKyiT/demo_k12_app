import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const ThrottledButton = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (!isDisabled) {
      // Gọi hàm thực hiện hành động ở đây
      setClickCount(prevCount => prevCount + 1);
      setIsDisabled(true);

      // Bắt đầu tính thời gian chờ (throttle)
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000); // Chờ 1 giây trước khi cho phép nhấn nút tiếp tục
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleClick} disabled={isDisabled}>
        <Text>Throttle Button</Text>
      </TouchableOpacity>
      <Text>Click Count: {clickCount}</Text>
    </SafeAreaView>
  );
};

export default ThrottledButton;
