import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import {Spacing} from '../theme';
import {updateSportsInfo} from '../store/formSlice';
import {getSports} from '../api/player';
import {validateSportsInfo} from '../utils/validation';

const PLAYING_STATUS_OPTIONS = [
  {label: 'Looking for Playground', value: 'Playground'},
  {label: 'Looking for Player', value: 'Partner'},
];

const SportsInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);

  const [playingStatus, setPlayingStatus] = useState(
    formData.playingStatus || '',
  );
  const [sport, setSport] = useState(formData.sport || '');
  const [sports, setSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    setLoadingSports(true);
    try {
      const response = await getSports();
      if (response?.data && Array.isArray(response.data)) {
        setSports(response.data);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to load sports. Please try again.');
    } finally {
      setLoadingSports(false);
    }
  };

  const handleNext = () => {
    const {isValid, errors: validationErrors} = validateSportsInfo({sport});

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateSportsInfo({playingStatus, sport}));
    setErrors({});
    navigation.navigate('Feedback');
  };

  const getPlayingStatusDisplay = () => {
    const found = PLAYING_STATUS_OPTIONS.find(o => o.value === playingStatus);
    return found?.label || playingStatus;
  };

  return (
    <ScreenWrapper
      title="Enter your details"
      showBack
      onBack={() => {
        // Save current state before going back
        dispatch(updateSportsInfo({playingStatus, sport}));
        navigation.goBack();
      }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Dropdown
            label="Playing Status"
            value={getPlayingStatusDisplay()}
            options={PLAYING_STATUS_OPTIONS}
            onSelect={item => {
              const val = typeof item === 'string' ? item : item;
              // Find the matching option
              const match = PLAYING_STATUS_OPTIONS.find(
                o => o.label === val || o.value === val,
              );
              setPlayingStatus(match?.value || val);
            }}
            placeholder="Select playing status"
          />

          <Dropdown
            label="Sport you like"
            required
            value={sport}
            options={sports}
            onSelect={item => {
              setSport(item);
              setErrors(prev => ({...prev, sport: undefined}));
            }}
            placeholder="Select a sport"
            loading={loadingSports}
            error={errors.sport}
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

export default SportsInfoScreen;
