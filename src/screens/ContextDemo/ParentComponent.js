import React, { createContext, useState, useMemo, useCallback } from 'react';
import ChildComponent from './ChildComponent';

// Tạo một Context
export const MyContext = createContext();

// Component cha cung cấp dữ liệu cho Context
function ParentComponent() {
  const [data, setData] = useState('Xin chao, toi la Provider');
  const handleChangeText = useCallback(text => {
    setData(text);
  }, []);

  const value = useMemo(
    () => ({
      data,
      handleChangeText,
    }),
    [data, handleChangeText],
  );

  return (
    <>
      <MyContext.Provider value={value}>
        <ChildComponent />
      </MyContext.Provider>
    </>
  );
}
export default ParentComponent;

// ParentComponent (dang co data o day) -> ChildComponent -> SecondChild (dang su dung data o day)
