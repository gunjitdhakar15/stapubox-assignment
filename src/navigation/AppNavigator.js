import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OtpVerifyScreen from '../screens/OtpVerifyScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import SportsInfoScreen from '../screens/SportsInfoScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PhoneLogin"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {backgroundColor: '#121212'},
      }}>
      {/* Auth Flow */}
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />

      {/* Profile Form Flow */}
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="SportsInfo" component={SportsInfoScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />

      {/* Summary */}
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
