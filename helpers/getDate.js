import * as Localization from 'expo-localization';
import 'moment-timezone';
import 'moment/min/locales';
import moment from 'moment/min/moment-with-locales';

function getLocale() {
  const { locale } = Localization;
  if (locale.indexOf('-') === -1) return locale;
  return locale.substr(0, locale.indexOf('-'));
}
const getDate = (date) => moment(date).locale(getLocale()).fromNow();

export default getDate;
