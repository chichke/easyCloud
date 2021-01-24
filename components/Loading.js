import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
    </SafeAreaView>
  );
}
