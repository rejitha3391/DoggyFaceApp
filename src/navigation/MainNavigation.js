import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen, {HomeScreenOptions} from '../screen/home/HomeScreen';
import BreedImageScreen, {
  BreedImageScreenOptions,
} from '../screen/breed_image/BreedImageScreen';
import {colors} from '../common/themes/Colors';

const Stack = createStackNavigator();

function MainNavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.primary,
          shadowOpacity: 0,
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
        },
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <Stack.Screen
        name="BreedImage"
        component={BreedImageScreen}
        options={BreedImageScreenOptions}
      />
    </Stack.Navigator>
  );
}
export default MainNavigationStack;
