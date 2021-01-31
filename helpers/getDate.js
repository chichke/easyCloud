import * as Localization from 'expo-localization';
import moment from 'moment';
import 'moment/min/locales';

const getDate = (date) => moment(date).locale(Localization.locale).fromNow();

export default getDate;
