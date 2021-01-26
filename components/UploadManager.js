import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import { finish } from '../redux/actions/uploadManager';

const styles = StyleSheet.create({
  container: { flex: 0.05 },
  progress: { flex: 1, backgroundColor: 'red' },
  playpause: { position: 'absolute', left: '40%', backgroundColor: 'white', top: '20%' },
  cancel: { position: 'absolute', right: '40%', backgroundColor: 'white', top: '20%' },
});

function UploadManager() {
  const uploadTask = useSelector((state) => state.uploadManager.uploadTask);
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let unsubscribe;

  const dispatch = useDispatch();

  const handlePlayPause = () => {
    if (isRunning) {
      uploadTask.pause();
      toast.show('Upload paused');
    } else {
      uploadTask.resume();
      toast.show('Upload resumed');
    }
  };

  const handleCancel = async () => {
    try {
      await uploadTask.cancel();
      if (unsubscribe) unsubscribe();
    } catch (error) {
      console.log(error);
    } finally {
      toast.show('Upload cancelled');
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
      .then((downloadURL) => {
        console.log('File available at', downloadURL);
        toast.show('Upload successful', { type: 'success' });
        // TODO Add url data to firebase realtime DB
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(finish());
        if (unsubscribe) unsubscribe();
      });
  };

  useEffect(() => {
    if (!uploadTask) return;
    console.log('.on');
    unsubscribe = uploadTask.on('state_changed', handleSnapshot, handleError, handleFinally);
  }, [uploadTask]);

  if (!uploadTask) return null;

  return (
    <View style={styles.container}>
      <View style={{ ...styles.progress, width: `${progress}%` }} />
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
