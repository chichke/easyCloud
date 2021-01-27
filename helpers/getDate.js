import * as Localization from 'expo-localization';
import moment from 'moment';

const { locale } = Localization;
const getDate = (date) => moment(date).locale(locale).fromNow();

export default getDate;
