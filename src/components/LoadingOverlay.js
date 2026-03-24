import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Colors, Typography} from '../theme';

const LoadingOverlay = ({visible = false, message = 'Loading...'}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 16,
  },
});

export default LoadingOverlay;
