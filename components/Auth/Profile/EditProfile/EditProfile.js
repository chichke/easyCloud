import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { fnameChange, lnameChange, mailChange, selfData } from '../../../../helpers/firebase';
import getBlob from '../../../../helpers/getBlob';
import { setFile } from '../../../../redux/actions/uploadManager';
import t from '../../../../translations';
import transFire from '../../../../translations/firebase';
import Button from '../../../ButtonWithText';
import Error from '../../../Error';
import Loading from '../../../Loading';
import { selfDataKey } from '../../../queryKey';
import styles from './styles';

const schema = Yup.object().shape({
  fname: Yup.string().min(2, t('yup.fname.min')).max(50, t('yup.fname.max')).notRequired(),
  lname: Yup.string().min(2, t('yup.lname.min')).max(50, t('yup.lname.max')).notRequired(),
  mail: Yup.string().email(t('yup.mail.invalid')).notRequired(),
});

export default function EditProfile() {
  const placeholderTextColor = '#8C8C8C';
  const toast = useToast();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mail, setMail] = useState('');
  const queryClient = useQueryClient();

  const pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (cancelled) toast.show(t('toast.home.cancel'), { type: 'normal' });
    else {
      toast.show(t('toast.home.preparing'), { type: 'success' });
      console.log('Constructing blobs');
      const blob = await getBlob(uri);

      console.log('Constructing blobs done');
      // TODO setFile 3 eme params is filename!
      dispatch(setFile(blob, true));
    }
  };

  const changeValue = async (payload) => {
    const { _mail, _lname, _fname } = payload;

    try {
      if (_mail) await mailChange(_mail);
      if (_lname) await lnameChange(_lname);
      if (_fname) await fnameChange(_fname);

      toast.show(t('v.prof.success'), { type: 'success' });
    } catch (err) {
      console.log(err.code);
      toast.show(transFire(err.code), { type: 'danger' });
    } finally {
      queryClient.invalidateQueries(selfDataKey);
    }
  };

  const onValidate = () => {
    const payload = { _mail: mail, _lname: lname, _fname: fname };
    if (!mail && !lname && !fname) toast.show(t('v.prof.allempty'), { type: 'danger' });
    else
      schema
        .validate()
        .then((valid) => {
          if (valid) changeValue(payload);
        })
        .catch((err) => {
          toast.show(err.errors[0], { type: 'danger' });
        });
  };

  const query = useQuery(selfDataKey, selfData);

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  const pp = { uri: data.pp };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.picContainer} onPress={pickImage}>
          <Image source={pp} style={styles.profilePic} />
        </TouchableOpacity>
        <TextInput
          value={lname}
          onChangeText={setLname}
          placeholder={t('v.signup.lname')}
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
        />
        <TextInput
          value={fname}
          onChangeText={setFname}
          placeholder={t('v.signup.fname')}
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
        />
        <TextInput
          value={mail}
          onChangeText={setMail}
          placeholder={t('v.signup.mail')}
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button
          style={styles.button}
          styleText={styles.textButton}
          onPress={onValidate}
          title={t('v.prof.validate')}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Feather name="chevron-left" color="black" size={wp(7)} />
      </TouchableOpacity>
    </ScrollView>
  );
}
