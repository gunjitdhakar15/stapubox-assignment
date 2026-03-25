import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import {Colors, Typography} from '../theme';
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
        <SummaryRow label="Name" value={formData.name} />
        <SummaryRow label="Address" value={getAddress()} />
        <SummaryRow label="Pin Code" value={formData.address?.pincode} />
        <SummaryRow
          label="Playing Status"
          value={getPlayingStatusDisplay()}
        />
        <SummaryRow label="Sport you like" value={getSportDisplay()} />
        <SummaryRow label="Feedback" value={formData.feedback} />

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
    paddingTop: 34,
  },
  row: {
    marginBottom: 20,
  },
  rowLabel: {
    ...Typography.label,
    marginBottom: 6,
  },
  rowValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  editButton: {
    marginTop: 10,
    marginBottom: 6,
  },
});

export default SummaryScreen;
