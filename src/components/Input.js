import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {Colors, Typography, Spacing} from '../theme';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  style,
  inputStyle,
  autoCapitalize = 'sentences',
}) => {
  const borderAnim = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? Colors.error : Colors.inputBorder,
      error ? Colors.error : Colors.inputBorderFocused,
    ],
  });

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <Animated.View
        style={[
          styles.inputWrapper,
          {borderColor},
          multiline && styles.multilineWrapper,
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textPlaceholder}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            !editable && styles.disabled,
            inputStyle,
          ]}
        />
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.labelSmall,
    marginBottom: 6,
    color: Colors.textSecondary,
  },
  required: {
    color: Colors.error,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.inputBackground,
  },
  multilineWrapper: {
    minHeight: 112,
  },
  input: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 11,
    height: 40,
  },
  multilineInput: {
    height: undefined,
    minHeight: 112,
    textAlignVertical: 'top',
    paddingTop: Spacing.md,
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    ...Typography.labelSmall,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});

export default Input;
