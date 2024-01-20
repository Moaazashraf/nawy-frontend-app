/* eslint-disable react-native/no-inline-styles */
import {Formik} from 'formik';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import client from '../../api/client';
import {ApartmentType} from '../../utils/types';

function ApartmentDetailsForm(props: {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
  setapartmentsList: Dispatch<SetStateAction<ApartmentType[]>>;
}): React.JSX.Element {
  const {setModalVisible, modalVisible, setapartmentsList} = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Finished', value: true},
    {label: 'Under Construction', value: false},
  ]);
  return (
    <View style={styles.formView}>
      <Formik
        initialValues={{
          compound: '',
          address: '',
          zipcode: '',
          bedrooms: '',
          bathrooms: '',
          price: '',
        }}
        onSubmit={values => {
          const zipcodeNumber = Number(values.zipcode);
          const bedroomsNumber = Number(values.bedrooms);
          const bathroomsNumber = Number(values.bathrooms);
          const priceNumber = Number(values.price);

          const apartmentDetails = {
            ...values,
            zipcode: zipcodeNumber,
            bedrooms: bedroomsNumber,
            bathrooms: bathroomsNumber,
            price: priceNumber,
            finished: value,
          };
          client
            .post('/nawy/apartments/add', {...apartmentDetails})
            .then(res => {
              if (res.data.data) {
                console.log(res.data.data[10]);

                setapartmentsList(res.data.data);
                setModalVisible(false);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              onChangeText={handleChange('compound')}
              onBlur={handleBlur('compound')}
              value={values.compound}
              style={styles.input}
              placeholder="Compound"
            />
            <TextInput
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              style={styles.input}
              placeholder="Address"
            />
            <TextInput
              onChangeText={value => {
                if (/^\d+(\.\d+)?$/.test(value) || value === '') {
                  handleChange('zipcode')(value);
                }
              }}
              onBlur={handleBlur('zipcode')}
              value={values.zipcode}
              style={styles.input}
              placeholder="Zipcode"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => {
                if (/^\d+(\.\d+)?$/.test(value) || value === '') {
                  handleChange('bedrooms')(value);
                }
              }}
              onBlur={handleBlur('bedrooms')}
              value={values.bedrooms}
              style={styles.input}
              placeholder="Bedrooms"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => {
                if (/^\d+(\.\d+)?$/.test(value) || value === '') {
                  handleChange('bathrooms')(value);
                }
              }}
              onBlur={handleBlur('bathrooms')}
              value={values.bathrooms}
              style={styles.input}
              placeholder="Bathrooms"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => {
                if (/^\d+(\.\d+)?$/.test(value) || value === '') {
                  handleChange('price')(value);
                }
              }}
              onBlur={handleBlur('price')}
              value={values.price}
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
            />

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.input}
              textStyle={{
                fontSize: 14,
              }}
              labelStyle={{
                fontWeight: '300',
              }}
              containerStyle={{
                width: '100%',
              }}
            />
            <View style={styles.footer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSubmit]}
                onPress={() => handleSubmit()}>
                <Text style={styles.textStyleSubmit}>Submit</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  formView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    width: 300,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
    padding: 10,
    borderRadius: 10,
    width: '60%',
  },

  buttonClose: {
    backgroundColor: 'white',
    borderColor: '#FF8F8F',
    borderWidth: 1,
    width: 'auto',
  },

  buttonSubmit: {
    backgroundColor: '#FF8F8F',
    borderColor: 'white',
    borderWidth: 1,
  },

  textStyle: {
    color: '#FF8F8F',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textStyleSubmit: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#FF8F8F',
    padding: 10,
    fontSize: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ApartmentDetailsForm;
