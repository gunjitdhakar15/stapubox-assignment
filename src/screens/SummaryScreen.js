import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {logout} from '../store/authSlice';
import {clearForm} from '../store/formSlice';

const SummaryRow = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value || '—'}</Text>
  </View>
);

const SummaryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);

  const getPlayingStatusDisplay = () => {
    if (formData.playingStatus === 'Playground') {
      return 'Looking for Playground';
    }
    if (formData.playingStatus === 'Partner') {
      return 'Looking for Player';
    }
    return formData.playingStatus || '—';
  };

  const getAddress = () => {
    const parts = [formData.address?.line1, formData.address?.line2].filter(
      Boolean,
    );
    return parts.join(', ') || '—';
  };

  const getSportDisplay = () => {
    if (!formData.sport) {
      return '—';
    }
    const sportName =
      typeof formData.sport === 'string' ? formData.sport : formData.sport;
    return sportName.charAt(0).toUpperCase() + sportName.slice(1);
  };

  const handleEdit = () => {
    navigation.navigate('BasicInfo');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          dispatch(clearForm());
          navigation.reset({
            index: 0,
            routes: [{name: 'PhoneLogin'}],
          });
        },
      },
    ]);
  };

  return (
    <ScreenWrapper
      title="Your details"
      rightAction={handleLogout}
      rightActionLabel="Logout"
      scrollable>
      <View style={styles.container}>
        <View style={styles.summaryCard}>
          <SummaryRow label="Name" value={formData.name} />
          <View style={styles.separator} />

          <SummaryRow label="Address" value={getAddress()} />
          <View style={styles.separator} />

          <SummaryRow label="Pin Code" value={formData.address?.pincode} />
          <View style={styles.separator} />

          <SummaryRow
            label="Playing Status"
            value={getPlayingStatusDisplay()}
          />
          <View style={styles.separator} />

          <SummaryRow label="Sport you like" value={getSportDisplay()} />
          <View style={styles.separator} />

          <SummaryRow label="Feedback" value={formData.feedback} />
        </View>

        <Button
          title="Edit"
          onPress={handleEdit}
          variant="secondary"
          style={styles.editButton}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  row: {
    paddingVertical: Spacing.md,
  },
  rowLabel: {
    ...Typography.labelSmall,
    color: Colors.textTertiary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
  editButton: {
    marginBottom: Spacing.lg,
  },
});

export default SummaryScreen;
