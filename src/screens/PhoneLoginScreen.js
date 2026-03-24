import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {Colors, Typography, Spacing} from '../theme';
import {setPhone, setLoading, setError, clearError} from '../store/authSlice';
import {sendOtp} from '../api/auth';
import {isValidPhone} from '../utils/validation';

const PhoneLoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {phone, loading, error} = useSelector(state => state.auth);
  const [phoneInput, setPhoneInput] = useState(phone || '');
  const [phoneError, setPhoneError] = useState('');

  const handleSendOtp = async () => {
    // Validate
    setPhoneError('');
    dispatch(clearError());

    if (!phoneInput.trim()) {
      setPhoneError('Phone number is required');
      return;
    }
    if (!isValidPhone(phoneInput.trim())) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    dispatch(setPhone(phoneInput.trim()));
    dispatch(setLoading(true));

    try {
      await sendOtp(phoneInput.trim());
      dispatch(setLoading(false));
      navigation.navigate('OtpVerify');
    } catch (err) {
      dispatch(setLoading(false));
      const message = err?.message || 'Failed to send OTP. Please try again.';
      dispatch(setError(message));
      Alert.alert('Error', message);
    }
  };

  return (
    <ScreenWrapper scrollable={false}>
      <LoadingOverlay visible={loading} message="Sending OTP..." />

      <View style={styles.container}>
        <View style={styles.topSection}>
          {/* Title */}
          <Text style={styles.title}>Login to Your Account</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to login
          </Text>

          {/* Phone Input */}
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.phoneInputWrapper}>
              <Input
                value={phoneInput}
                onChangeText={text => {
                  setPhoneInput(text.replace(/[^0-9]/g, ''));
                  setPhoneError('');
                }}
                placeholder="9999999999"
                keyboardType="phone-pad"
                maxLength={10}
                error={phoneError || (error ? error : '')}
                style={styles.phoneInput}
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          {/* Send OTP Button */}
          <Button
            title="Send OTP"
            onPress={handleSendOtp}
            loading={loading}
            disabled={!phoneInput.trim()}
            style={styles.sendButton}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have account? </Text>
            <Button
              title="Create Account"
              variant="text"
              onPress={() => {}}
              textStyle={styles.createAccountText}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    paddingBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingRight: Spacing.md,
  },
  countryCodeText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: Spacing.md,
  },
  phoneInputWrapper: {
    flex: 1,
  },
  phoneInput: {
    marginBottom: 0,
  },
  sendButton: {
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  createAccountText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PhoneLoginScreen;
