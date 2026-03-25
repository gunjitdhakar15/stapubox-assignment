import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {Colors, Typography, Spacing} from '../theme';
import {updateFeedback} from '../store/formSlice';
import {savePlayer} from '../api/player';

const FeedbackScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);
  const [feedback, setFeedback] = useState(formData.feedback || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Save feedback to Redux
    dispatch(updateFeedback(feedback));

    // Build complete player_data payload
    const playerData = {
      name: formData.name,
      address: {
        line1: formData.address.line1,
        line2: formData.address.line2 || '',
        pincode: formData.address.pincode,
      },
      playingStatus: formData.playingStatus || '',
      sport: formData.sport,
      feedback: feedback,
    };

    setSubmitting(true);

    try {
      await savePlayer(playerData);
      setSubmitting(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'Summary'}],
      });
    } catch (err) {
      setSubmitting(false);
      const message =
        err?.message || 'Failed to save profile. Please try again.';
      Alert.alert('Error', message);
    }
  };

  return (
    <ScreenWrapper
      title="Share Your Feedback"
      showBack
      onBack={() => {
        dispatch(updateFeedback(feedback));
        navigation.goBack();
      }}>
      <LoadingOverlay visible={submitting} message="Saving profile..." />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Feedback</Text>
          <Input
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Enter your feedback here..."
            multiline
            numberOfLines={6}
            style={styles.feedbackInput}
          />
        </View>

        <Button
          title="Submit"
          onPress={handleSubmit}
          loading={submitting}
          style={styles.submitButton}
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
  formContainer: {
    flex: 1,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  feedbackInput: {
    marginBottom: 0,
  },
  submitButton: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
});

export default FeedbackScreen;
