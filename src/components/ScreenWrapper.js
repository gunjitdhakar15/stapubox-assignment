import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors, Spacing, Typography} from '../theme';

const ScreenWrapper = ({
  children,
  title,
  showBack = false,
  onBack,
  scrollable = true,
  rightAction,
  rightActionLabel,
  style,
  contentStyle,
}) => {
  const Content = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        {/* Header */}
        {(title || showBack || rightAction) && (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {showBack && (
                <TouchableOpacity
                  onPress={onBack}
                  style={styles.backButton}
                  activeOpacity={0.7}>
                  <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.headerCenter}>
              {title && <Text style={styles.headerTitle}>{title}</Text>}
            </View>
            <View style={styles.headerRight}>
              {rightAction && (
                <TouchableOpacity
                  onPress={rightAction}
                  style={styles.rightButton}
                  activeOpacity={0.7}>
                  <Text style={styles.rightButtonText}>
                    {rightActionLabel || 'Action'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Content */}
        <Content
          style={[styles.flex, style]}
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </Content>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    height: 56,
  },
  headerLeft: {
    width: 48,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end',
  },
  headerTitle: {
    ...Typography.bodySemiBold,
    color: Colors.textPrimary,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 36,
  },
  rightButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  rightButtonText: {
    ...Typography.label,
    color: Colors.error,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xxxl,
  },
});

export default ScreenWrapper;
