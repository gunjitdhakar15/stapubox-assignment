import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {Colors, Typography, Spacing} from '../theme';
import {setToken, setLoading, setError} from '../store/authSlice';
import {setFormData, setHasExistingProfile} from '../store/formSlice';
import {verifyOtp} from '../api/auth';
import {getPlayer} from '../api/player';

const OTP_LENGTH = 4;

const OtpVerifyScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {phone, loading} = useSelector(state => state.auth);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [checkingProfile, setCheckingProfile] = useState(false);
  const inputRefs = useRef([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {toValue: 10, duration: 50, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: -10, duration: 50, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: 10, duration: 50, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: 0, duration: 50, useNativeDriver: true}),
    ]).start();
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const checkExistingProfile = async token => {
    setCheckingProfile(true);
    try {
      const response = await getPlayer();
      if (
        response &&
        response.data &&
        response.status !== 'failed' &&
        response.data.player_data
      ) {
        // Existing profile found
        dispatch(setFormData(response.data.player_data));
        setCheckingProfile(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Summary'}],
        });
      } else {
        // No profile
        dispatch(setHasExistingProfile(false));
        setCheckingProfile(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'BasicInfo'}],
        });
      }
    } catch (err) {
      // 404 or error means no profile
      dispatch(setHasExistingProfile(false));
      setCheckingProfile(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'BasicInfo'}],
      });
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== OTP_LENGTH) {
      setOtpError('Please enter the complete OTP');
      shakeInputs();
      return;
    }

    dispatch(setLoading(true));
    setOtpError('');

    try {
      const response = await verifyOtp(phone, otpString);
      const token =
        response?.data?.token || response?.token || response?.data?.jwt;

      if (token) {
        dispatch(setToken(token));
        dispatch(setLoading(false));
        // Check for existing profile
        await checkExistingProfile(token);
      } else {
        dispatch(setLoading(false));
        setOtpError('Invalid response. Please try again.');
        shakeInputs();
      }
    } catch (err) {
      dispatch(setLoading(false));
      const message = err?.message || 'Wrong OTP entered';
      setOtpError(message);
      dispatch(setError(message));
      shakeInputs();
    }
  };

  const handleResendOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setOtpError('');
    Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number.');
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  };

  const otpString = otp.join('');

  return (
    <ScreenWrapper
      title="Phone Verification"
      showBack
      onBack={() => navigation.goBack()}
      scrollable={false}>
      <LoadingOverlay
        visible={loading || checkingProfile}
        message={checkingProfile ? 'Checking profile...' : 'Verifying OTP...'}
      />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.subtitle}>
            Enter 4 digit OTP sent to your phone number
          </Text>

          {/* OTP Input Boxes */}
          <Animated.View
            style={[styles.otpContainer, {transform: [{translateX: shakeAnim}]}]}>
            {Array(OTP_LENGTH)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    otp[index] && styles.otpBoxFilled,
                    otpError && styles.otpBoxError,
                  ]}>
                  <TextInput
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    value={otp[index]}
                    onChangeText={value => handleOtpChange(value.slice(-1), index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                </View>
              ))}
          </Animated.View>

          {/* Error */}
          {otpError ? (
            <Text style={styles.errorText}>{otpError}</Text>
          ) : null}

          {/* Resend */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive OTP? </Text>
            <Button
              title="Resend OTP"
              variant="text"
              onPress={handleResendOtp}
              textStyle={styles.resendLink}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Button
            title="Verify OTP"
            onPress={handleVerify}
            loading={loading}
            disabled={otpString.length !== OTP_LENGTH}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Spacing.xl,
  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    paddingBottom: Spacing.xxl,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    borderBottomColor: Colors.primary,
  },
  otpBoxError: {
    borderBottomColor: Colors.error,
  },
  otpInput: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  errorText: {
    ...Typography.labelSmall,
    color: Colors.error,
    marginBottom: Spacing.lg,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  resendText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OtpVerifyScreen;
