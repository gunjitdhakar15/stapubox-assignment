import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import store from './store';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
