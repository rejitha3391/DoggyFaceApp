import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationStack from './src/navigation/MainNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/state/config/store';
import {StatusBar} from 'react-native';
import {colors} from './src/common/themes/Colors';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} />
        <MainNavigationStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
