import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors, Typography, Spacing} from '../theme';

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

      {modalVisible ? (
        <View style={styles.inlineOptions}>
          {options.map((item, index) => {
            const key =
              item?.sport_id?.toString() ||
              item?.value?.toString() ||
              index.toString();
            const itemLabel =
              item?.label || item?.sport_name || item?.value || item;
            const isSelected = displayValue === itemLabel;

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.option,
                  index === options.length - 1 && styles.optionLast,
                  isSelected && styles.selectedOption,
                ]}
                onPress={() =>
                  handleSelect(typeof item === 'string' ? item : itemLabel)
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
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label,
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  required: {
    color: Colors.error,
  },
  selector: {
    height: 36,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 6,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
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
    fontSize: 9,
    marginLeft: 8,
  },
  error: {
    ...Typography.labelSmall,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  inlineOptions: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    marginTop: 6,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#2f2f2f',
  },
  selectedOptionText: {
    fontWeight: '600',
  },
});

export default Dropdown;
