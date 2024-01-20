import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';

interface HomeProps {
  navigation: NavigationProp<any>;
}

function Home(props: HomeProps): React.JSX.Element {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.primary_heading}>
          <Text style={styles.primary_heading__main}>Comfort</Text>
          {'\n'}
          <Text style={styles.primary_heading__sub}>In Your Space</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Apartments')}>
            <Text style={styles.btn}>Get Your Dream Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      'linear-gradient(to right bottom, rgba(126, 213, 111, 0.84), rgba(40, 180, 133, 0.815))',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
  },
  primary_heading: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    overflow: 'hidden',
  },
  primary_heading__main: {
    fontSize: 40,
    letterSpacing: 10,
  },
  primary_heading__sub: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 100,
  },
  buttonContainer: {
    borderRadius: 100,
    backgroundColor: 'white',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 64,
    textTransform: 'uppercase',
    fontSize: 16,
    borderRadius: 100,
  },
});

export default Home;
