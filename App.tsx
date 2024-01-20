import React from 'react';
import Home from './app/components/HomePage/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApartmentsList from './app/components/ApartmentsList/ApartmentsList';
import ApartmentDetails from './app/components/ApartmentDetails/ApartmentDetails';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Apartments" component={ApartmentsList} />
        <Stack.Screen name="Apartment Details" component={ApartmentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
