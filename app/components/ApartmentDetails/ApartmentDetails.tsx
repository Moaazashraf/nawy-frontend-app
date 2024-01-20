import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {NavigationProp, Route} from '@react-navigation/native';
import {ApartmentType} from '../../utils/types';
import client from '../../api/client';

interface ApartmentDetailsProps {
  navigation: NavigationProp<any>;
  route: Route<any>;
}

function ApartmentDetails(props: ApartmentDetailsProps): React.JSX.Element {
  const {route} = props;
  const [apartment, setApartment] = useState<ApartmentType | undefined>();

  useEffect(() => {
    const fetchData = () => {
      if (route.params && 'id' in route.params) {
        // Check if 'id' exists in route.params
        const apartmentId = route.params.id;
        client
          .get(`/nawy/apartments/${apartmentId}`)
          .then(res => {
            if (res.data.data) {
              setApartment(res.data.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    fetchData();
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.apartmentDetails}>
        <Text>
          <Text>Compound: {apartment?.compound}</Text>
          {'\n'}
          <Text>Bathrooms : {apartment?.bathrooms}</Text>
          {'\n'}
          <Text>Bedrooms : {apartment?.bedrooms}</Text>
          {'\n'}
          <Text>Address : {apartment?.address}</Text>
          {'\n'}
          <Text>Finished : {apartment?.finished ? '✅' : '❌'}</Text>
          {'\n'}
          <Text>Price : {apartment?.price}</Text>
          {'\n'}
          <Text>Zipcode : {apartment?.zipcode}</Text>
          {'\n'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      'linear-gradient(to right bottom, rgba(126, 213, 111, 0.84), rgba(40, 180, 133, 0.815))',
    height: '100%',
  },

  apartmentDetails: {
    backgroundColor: 'white',
    padding: 20,
    opacity: 0.9,
    borderRadius: 10,
  },
});

export default ApartmentDetails;
