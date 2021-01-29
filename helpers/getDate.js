import * as Localization from 'expo-localization';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/it';

const getDate = (date) => moment(date).locale(Localization.locale).fromNow();

export default getDate;
