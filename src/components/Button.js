import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {Colors, Typography} from '../theme';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'text'
  style,
  textStyle,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          isDisabled && styles.disabledButton,
        ];
      case 'text':
        return [styles.button, styles.textButton];
      default:
        return [
          styles.button,
          styles.primaryButton,
          isDisabled && styles.disabledButton,
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.buttonText, styles.secondaryText];
      case 'text':
        return [styles.buttonText, styles.linkText];
      default:
        return [
          styles.buttonText,
          styles.primaryText,
          isDisabled && styles.disabledText,
        ];
    }
  };

  return (
    <Animated.View style={[{transform: [{scale: scaleAnim}]}, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={getButtonStyle()}>
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? Colors.textPrimary : Colors.primary}
            size="small"
          />
        ) : (
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: 0,
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabled,
  },
  buttonText: {
    ...Typography.button,
  },
  primaryText: {
    color: Colors.textPrimary,
  },
  secondaryText: {
    color: Colors.primary,
  },
  linkText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '500',
  },
  disabledText: {
    color: Colors.buttonDisabledText,
  },
});

export default Button;
