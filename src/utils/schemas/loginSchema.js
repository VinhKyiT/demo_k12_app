import * as Yup from 'yup';

const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-]).*$/,
    //   'Mật khẩu phải bao gồm ít nhất một chữ thường, một chữ hoa, một số, và một trong các ký tự đặc biệt: !@#$%^&*_-',
    // )
    .required('Mật khẩu là bắt buộc'),
});

export { validationLoginSchema };
