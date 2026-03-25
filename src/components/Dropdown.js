import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Colors, Typography, BorderRadius, Spacing} from '../theme';

const Dropdown = ({
  label,
  value,
  options = [],
  onSelect,
  placeholder = 'Select an option',
  required = false,
  error,
  loading = false,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = item => {
    onSelect(item);
    setModalVisible(false);
  };

  const displayValue =
    typeof value === 'object' ? value?.label || value?.sport_name : value;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.selector,
          error && styles.selectorError,
        ]}
        onPress={() => !loading && setModalVisible(true)}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.selectorText,
            !displayValue && styles.placeholderText,
          ]}>
          {loading ? 'Loading...' : displayValue || placeholder}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label || 'Select an option'}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item, index) =>
                item.sport_id?.toString() ||
                item.value?.toString() ||
                index.toString()
              }
              renderItem={({item}) => {
                const itemLabel =
                  item.label || item.sport_name || item.value || item;
                const isSelected = displayValue === itemLabel;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && styles.selectedOption,
                    ]}
                    onPress={() =>
                      handleSelect(
                        typeof item === 'string' ? item : itemLabel,
                      )
                    }
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}>
                      {typeof itemLabel === 'string'
                        ? itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1)
                        : itemLabel}
                    </Text>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.sm,
    color: Colors.textSecondary,
  },
  required: {
    color: Colors.error,
  },
  selector: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  selectorError: {
    borderColor: Colors.error,
  },
  selectorText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  placeholderText: {
    color: Colors.textPlaceholder,
  },
  chevron: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginLeft: Spacing.sm,
  },
  error: {
    ...Typography.labelSmall,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '60%',
    paddingBottom: Spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: Colors.textSecondary,
    fontSize: 18,
  },
  optionsList: {
    paddingHorizontal: Spacing.screenPadding,
  },
  option: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
  },
  optionText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: Spacing.sm,
  },
});

export default Dropdown;
