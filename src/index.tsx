import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          options={{
            headerStyle: {backgroundColor: '#aab6f6'},
            headerTintColor: 'white',
          }}
          component={ProductDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
