import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { selfData } from '../../../helpers/firebase';
import { resetFiles } from '../../../redux/actions/file';
import t from '../../../translations';
import Button from '../../ButtonWithText';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey, selfDataKey } from '../../queryKey';
import styles from './styles';

export default function Profile() {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();
  const { email } = firebase.auth().currentUser;
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const [onSignout, setOnSignout] = useState(false);

  const query = useQuery(selfDataKey, selfData);

  const signout = async () => {
    setOnSignout(true);

    try {
      dispatch(resetFiles());
      queryClient.setQueryData(selfDataKey, {});
      queryClient.setQueryData(getFilesKey, {});
      await firebase.auth().signOut();
    } catch (error) {
      setOnSignout(false);
    }
  };

  const onEdit = () => {
    navigate('EditProfile');
  };

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  const pp = { uri: data.pp };
  return onSignout ? (
    <Loading />
  ) : (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Image source={pp} style={styles.profilePic} />
        </View>
        <View style={styles.texts}>
          <Text style={styles.name}>{`${data.first} ${data.last}`}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            styleText={styles.textButton}
            title={t('v.prof.edit')}
            onPress={onEdit}
          />
          <Button
            style={{ ...styles.button, borderColor: colors.primary }}
            styleText={styles.textButton}
            title={t('v.prof.signout')}
            onPress={signout}
          />
        </View>
      </View>
    </ScrollView>
  );
}
