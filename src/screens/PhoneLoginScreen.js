import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {Colors, Typography} from '../theme';
import {
  setPhone,
  setOtpSessionId,
  setLoading,
  setError,
  clearError,
} from '../store/authSlice';
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
      const response = await sendOtp(phoneInput.trim());
      const sessionId = response?.data?.[0]?.sessionId ?? null;
      dispatch(setOtpSessionId(sessionId));
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
    <ScreenWrapper scrollable={false} contentContainerFlex>
      <LoadingOverlay visible={loading} message="Sending OTP..." />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Login to Your Account</Text>

          <View style={styles.phoneContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
              <Text style={styles.countryArrow}>▼</Text>
            </TouchableOpacity>
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
                autoCapitalize="none"
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
    paddingTop: 172,
  },
  topSection: {
    alignItems: 'center',
  },
  bottomSection: {
    marginTop: 18,
    width: '100%',
    maxWidth: 286,
    alignSelf: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: 18,
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 286,
    alignSelf: 'center',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 52,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  countryCodeText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  countryArrow: {
    color: Colors.textPrimary,
    fontSize: 8,
  },
  phoneInputWrapper: {
    flex: 1,
  },
  phoneInput: {
    marginBottom: 0,
  },
  sendButton: {
    marginBottom: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textPrimary,
  },
  createAccountText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default PhoneLoginScreen;
