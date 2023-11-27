import * as Yup from 'yup';

const regexFullName =
  /^[a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđÆ.-]{1,}(?: [a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđÆ.-]+){0,6}$/;

export const changeInfoSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  name: Yup.string()
    .lowercase()
    .required('Tên là bắt buộc')
    .matches(regexFullName, 'Vui lòng nhập tên hợp lệ'),
  oldPassword: Yup.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
  newPassword: Yup.string().when('oldPassword', (e, schema) => {
    console.log('e[0]', e[0]);
    if (e[0] === '' || e[0] === undefined) {
      return Yup.string().notRequired();
    } else {
      return Yup.string().required('Mật khẩu là bắt buộc');
    }
    // console.log(e, schema);
  }),
  reEnterPassword: Yup.string()
    .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
    .oneOf([Yup.ref('newPassword'), null], 'Vui lòng nhập lại mật khẩu giống mật khẩu mới'),
});
