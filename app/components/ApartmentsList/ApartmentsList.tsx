import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  View,
  Alert,
} from 'react-native';
import client from '../../api/client';
import {ApartmentType} from '../../utils/types';
import {NavigationProp} from '@react-navigation/native';
import ApartmentDetailsForm from '../ApartmentDetailsForm/ApartmentDetailsForm';

interface ApartmentsListProps {
  navigation: NavigationProp<any>;
}
function ApartmentsList(props: ApartmentsListProps): React.JSX.Element {
  const {navigation} = props;

  const [apartmentsList, setapartmentsList] = useState<ApartmentType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchData = () => {
    client
      .get('/nawy/apartments/')
      .then(res => {
        if (res.data.data) {
          setapartmentsList(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ApartmentDetailsForm
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setapartmentsList={setapartmentsList}
          />
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.apartmentsContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addBtn}>
          <Text style={styles.btnText}>Add One</Text>
        </TouchableOpacity>
        {apartmentsList.map(apartment => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Apartment Details', {id: apartment.id!})
            }
            key={apartment.id}
            style={styles.apartmentDetails}>
            <Text>
              <Text>Compound: {apartment.compound}</Text>
              {'\n'}
              <Text>Address: {apartment.address}</Text>
              {'\n'}
              <Text>Price: {apartment.price}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      'linear-gradient(to right bottom, rgba(126, 213, 111, 0.84), rgba(40, 180, 133, 0.815))',
    height: '100%',
  },
  apartmentsContainer: {
    padding: 20,
    gap: 30,
  },
  apartmentDetails: {
    backgroundColor: 'white',
    padding: 20,
    opacity: 0.9,
    borderRadius: 10,
  },
  addBtn: {
    backgroundColor: '#FF8F8F',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.9,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default ApartmentsList;
