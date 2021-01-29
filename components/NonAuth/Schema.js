import * as Yup from 'yup';
import t from '../../translations';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default Yup.object().shape({
  first: Yup.string()
    .min(2, t('yup.fname.min'))
    .max(50, t('yup.fname.max'))
    .required(t('yup.fname.r')),
  last: Yup.string()
    .min(2, t('yup.lname.min'))
    .max(50, t('yup.lname.max'))
    .required(t('yup.lname.r')),
  mail: Yup.string().email(t('yup.mail.invalid')).required(t('yup.mail.r')),
  phone: Yup.string().matches(phoneRegExp, t('yup.phone.invalid')),
  pass: Yup.string().min(2, t('yup.pass.min')).max(50, t('yup.pass.max')).required(t('yup.pass.r')),
  confirm: Yup.string().oneOf([Yup.ref('pass'), null], t('yup.confirm')),
});
