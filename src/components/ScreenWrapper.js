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
  contentContainerFlex = false,
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
          contentContainerStyle={[
            styles.content,
            contentContainerFlex && styles.contentFlex,
            contentStyle,
          ]}
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
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 46,
  },
  headerLeft: {
    width: 34,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 52,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.textPrimary,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 12,
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
  },
  rightButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  rightButtonText: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.error,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 24,
  },
  contentFlex: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
