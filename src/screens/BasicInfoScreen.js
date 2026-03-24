import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import {Spacing} from '../theme';
import {updateBasicInfo} from '../store/formSlice';
import {validateBasicInfo} from '../utils/validation';

const BasicInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);

  const [name, setName] = useState(formData.name || '');
  const [line1, setLine1] = useState(formData.address?.line1 || '');
  const [line2, setLine2] = useState(formData.address?.line2 || '');
  const [pincode, setPincode] = useState(formData.address?.pincode || '');
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const {isValid, errors: validationErrors} = validateBasicInfo({
      name,
      line1,
      pincode,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Save to Redux
    dispatch(updateBasicInfo({name, line1, line2, pincode}));
    setErrors({});
    navigation.navigate('SportsInfo');
  };

  const clearFieldError = field => {
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  return (
    <ScreenWrapper
      title="Enter your details"
      showBack
      onBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Input
            label="Name"
            required
            value={name}
            onChangeText={text => {
              setName(text);
              clearFieldError('name');
            }}
            placeholder="Enter your name"
            error={errors.name}
          />

          <Input
            label="Address Line 1"
            required
            value={line1}
            onChangeText={text => {
              setLine1(text);
              clearFieldError('line1');
            }}
            placeholder="Enter address line 1"
            error={errors.line1}
          />

          <Input
            label="Address Line 2"
            value={line2}
            onChangeText={setLine2}
            placeholder="(Optional)"
          />

          <Input
            label="Pin Code"
            required
            value={pincode}
            onChangeText={text => {
              setPincode(text.replace(/[^0-9]/g, ''));
              clearFieldError('pincode');
            }}
            placeholder="Enter pin code"
            keyboardType="number-pad"
            maxLength={6}
            error={errors.pincode}
          />
        </View>

        <Button
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
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
  nextButton: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
});

export default BasicInfoScreen;
