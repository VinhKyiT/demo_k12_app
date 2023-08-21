import { foodData } from '../mock';
// Hàm mock API để tải thêm dữ liệu
const mockFetchMoreData = (currentPage, pageSize, dataSource = foodData) => {
  return new Promise(resolve => {
    // Mô phỏng việc gọi API và nhận dữ liệu mới
    setTimeout(() => {
      let newData = [];
      const startIndex = (currentPage - 1) * pageSize + 1;
      const endIndex = startIndex + pageSize;
      if (endIndex <= dataSource?.length) {
        newData = dataSource.slice(startIndex, endIndex);
      }
      resolve(newData);
    }, 2000); // Mô phỏng thời gian trễ khi gọi API
  });
};

export { mockFetchMoreData };
