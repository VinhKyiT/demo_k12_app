import { uploadFileApi } from '../apis/files.apis';

const uploadFile = async file => {
  const formData = new FormData();

  const filename = file?.filename || file.path?.split('/')?.reverse()?.[0];

  formData.append('file', {
    uri: file.path,
    type: file.mime,
    name: filename,
  });
  try {
    const res = await uploadFileApi(formData);
    console.log('res', res);
    return res;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
export { uploadFile };
