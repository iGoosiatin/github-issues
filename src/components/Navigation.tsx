import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import IssuesScreen from '../screens/IssuesScreen';

import { SCREENS } from '../Constants';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREENS.ISSUES} component={IssuesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
