import React, { Component, useState, useEffect } from 'react';

import { 
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  AppThemeState,
  ScrollView,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function App() {

  const styles = useDynamicStyleSheet(dynamicStyles);
  
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
    pos => {
        setError("");
        setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
        });
    },
    e => setError(e.message)
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => setError(e.message)
    );
  };

  return (
    <View>
      <MapView
        style={styles.map}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
      <Text style={styles.header}>Welcome</Text>
      <View style={styles.content}>
        <ScrollView horizontal style={styles.cardview}>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f5f5f5', '#000000'),
    
  },

  mapView: {
    position: 'absolute',
  },

  map: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  header: {
    paddingHorizontal: 10,
    marginTop: 60,
    fontSize: 35,
    fontWeight: 'bold',
    color: new DynamicValue('#000000', '#f5f5f5')
  },
  
  subHeader: {
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: new DynamicValue('#000000', '#f5f5f5')
  },

  content: {
    marginTop: hp('55%'),
    height: 200,
    width: Dimensions.get('window').width,
  },

  cardview: {
    marginHorizontal: 10,
  },

  card: {
    borderRadius: 10,
    width: 300,
    height: 200,
    marginRight: 15,
    backgroundColor: new DynamicValue('#c1c1c1', '#f5f5f5')
  },

  bottomHeader: {
    color: '#f5f5f5'
  },
  BottomContainer: {
    color: '#ccc'
  },
});