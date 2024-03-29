import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import * as Progress from 'react-native-progress';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import { setPP } from '../helpers/firebase';
import { finish } from '../redux/actions/uploadManager';
import t from '../translations';
import { getFilesKey, selfDataKey } from './queryKey';

const styles = StyleSheet.create({
  container: { flex: 0.1 },
  playpause: { position: 'absolute', left: '40%', backgroundColor: 'white', top: '20%' },
  cancel: { position: 'absolute', right: '40%', backgroundColor: 'white', top: '20%' },
});

function UploadManager() {
  const { uploadTask, isPP } = useSelector((state) => state.uploadManager);
  const width = Math.round(Dimensions.get('window').width);
  const { colors } = useTheme();

  const queryClient = useQueryClient();
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let unsubscribe;

  const dispatch = useDispatch();

  const handlePlayPause = () => {
    if (isRunning) {
      uploadTask.pause();
      toast.show(t('toast.up.pause'));
    } else {
      uploadTask.resume();
      toast.show(t('toast.up.resume'));
    }
  };

  const handleCancel = async () => {
    try {
      if (!isRunning) await uploadTask.resume();
      await uploadTask.cancel();
    } catch (error) {
      console.log(error);
    } finally {
      if (unsubscribe) unsubscribe();

      toast.show(t('toast.up.cancel'));
    }
  };

  const handleSnapshot = (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        setIsRunning(false);
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        setIsRunning(true);
        break;
      default:
        break;
    }
  };

  const handleError = () => {
    dispatch(finish());
    // Handle unsuccessful uploads
  };

  const handleFinally = () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref
      .getDownloadURL()
      .then(async (downloadURL) => {
        if (isPP) {
          await setPP(downloadURL);
          queryClient.invalidateQueries(selfDataKey);
        }
        queryClient.invalidateQueries(getFilesKey);
        toast.show(t('toast.up.successful'), { type: 'success' });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(finish());
        if (unsubscribe) unsubscribe();
      });
  };

  useEffect(() => {
    if (!uploadTask) return;
    unsubscribe = uploadTask.on('state_changed', handleSnapshot, handleError, handleFinally);
  }, [uploadTask]);

  if (!uploadTask) return null;

  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress / 100} width={width} color={colors.primary} />
      <TouchableOpacity onPress={handlePlayPause} style={styles.playpause}>
        <Feather name={isRunning ? 'pause' : 'play'} size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={styles.cancel}>
        <Feather name="slash" size={20} />
      </TouchableOpacity>
    </View>
  );
}

export default UploadManager;
