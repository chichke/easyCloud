import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default Yup.object().shape({
  first: Yup.string()
    .min(2, 'Firstname Too Short!')
    .max(50, 'Firstname Too Long!')
    .required('Firstname is Required'),
  last: Yup.string()
    .min(2, 'Lastname Too Short!')
    .max(50, 'Lastname Too Long!')
    .required('Lastname is Required'),
  mail: Yup.string().email('Invalid email').required('Mail is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  pass: Yup.string()
    .min(2, 'Password is too Short!')
    .max(50, 'Password is too Long!')
    .required('Password is Required'),
  confirm: Yup.string().oneOf([Yup.ref('pass'), null], 'Passwords must match'),
});
