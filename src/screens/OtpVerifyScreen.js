import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {Colors} from '../theme';
import {
  setToken,
  setOtpSessionId,
  setLoading,
  setError,
  clearError,
} from '../store/authSlice';
import {setFormData, setHasExistingProfile} from '../store/formSlice';
import {sendOtp, verifyOtp} from '../api/auth';
import {getPlayer} from '../api/player';

const OTP_LENGTH = 4;

const OtpVerifyScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {phone, otpSessionId, loading} = useSelector(state => state.auth);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [checkingProfile, setCheckingProfile] = useState(false);
  const inputRefs = useRef([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
    dispatch(clearError());
  }, [dispatch]);

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

  const checkExistingProfile = async authToken => {
    setCheckingProfile(true);
    try {
      const playerData = await getPlayer(authToken);
      if (playerData) {
        // Existing profile found
        dispatch(setFormData(playerData));
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
      const isMissingProfile =
        err?.status === 404 || err?.data?.err === 'NOT FOUND';

      dispatch(setHasExistingProfile(false));
      setCheckingProfile(false);

      if (isMissingProfile) {
        navigation.reset({
          index: 0,
          routes: [{name: 'BasicInfo'}],
        });
        return;
      }

      Alert.alert(
        'Profile Load Error',
        err?.message || 'Unable to fetch saved profile. Please try again.',
      );
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
      const response = await verifyOtp(phone, otpString, otpSessionId);
      const token =
        response?.data?.[0]?.token ||
        response?.data?.[0]?.jwt ||
        response?.data?.token ||
        response?.data?.jwt ||
        response?.token ||
        response?.jwt;

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
      const message =
        err?.message === 'Invalid OTP or expired'
          ? 'Wrong OTP Entered'
          : err?.message || 'Wrong OTP Entered';
      setOtpError(message);
      dispatch(setError(message));
      shakeInputs();
    }
  };

  const handleResendOtp = () => {
    dispatch(setLoading(true));
    setOtp(Array(OTP_LENGTH).fill(''));
    setOtpError('');

    sendOtp(phone)
      .then(response => {
        const sessionId = response?.data?.[0]?.sessionId ?? null;
        dispatch(setOtpSessionId(sessionId));
        dispatch(setLoading(false));
        Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number.');
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      })
      .catch(err => {
        dispatch(setLoading(false));
        const message = err?.message || 'Failed to resend OTP. Please try again.';
        setOtpError(message);
        dispatch(setError(message));
      });
  };

  const otpString = otp.join('');

  return (
    <ScreenWrapper
      title="Phone Verification"
      showBack
      onBack={() => navigation.goBack()}
      scrollable={false}
      contentContainerFlex>
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
    paddingTop: 18,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: 8,
    width: '100%',
    maxWidth: 286,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.textPrimary,
    marginBottom: 30,
    maxWidth: 250,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
    alignSelf: 'center',
  },
  otpBox: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    borderColor: Colors.textPrimary,
  },
  otpBoxError: {
    borderColor: Colors.textPrimary,
  },
  otpInput: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.error,
    marginBottom: 4,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  resendLink: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default OtpVerifyScreen;
