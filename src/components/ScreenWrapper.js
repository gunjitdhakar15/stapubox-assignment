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
import {Colors, Spacing} from '../theme';

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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    minHeight: 52,
  },
  headerLeft: {
    width: 44,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 72,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.textPrimary,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22,
  },
  rightButton: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  rightButtonText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.error,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 28,
  },
});

export default ScreenWrapper;
