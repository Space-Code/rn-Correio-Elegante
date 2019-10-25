import React, { useState, useEffect } from 'react';

import { 
  View,
  Text,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

import MapView from 'react-native-maps';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
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
        showsUserLocation={true}
        pitchEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
      <View style={styles.headerView}>
        <Text style={styles.header}>Welcome</Text>
        <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://cdn3.f-cdn.com/contestentries/1269942/15600440/5a991c82be987_thumb900.jpg'}}
        />
        </View>
      </View>
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

  headerView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    paddingHorizontal: 10,
    marginTop: 60,
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: new DynamicValue('#000000', '#f5f5f5')
  },

  avatarView: {
    paddingHorizontal: 10,
    marginTop: 60,
    color: new DynamicValue('#000000', '#f5f5f5')
  },

  avatar: {
    width: wp('15%'),
    height: hp('6%'),
    borderRadius: 10,
  },
  
  subHeader: {
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: new DynamicValue('#000000', '#f5f5f5')
  },

  content: {
    marginTop: hp('55%'),
    height: hp('25%'),
    width: Dimensions.get('window').width,
  },

  cardview: {
    paddingHorizontal: 10
  },

  card: {
    borderRadius: 10,
    width: wp('88%'),
    height: hp('25%'),
    marginRight: 10,
    backgroundColor: new DynamicValue('#c1c1c1', '#f5f5f5')
  },

  bottomHeader: {
    color: '#f5f5f5'
  },
  BottomContainer: {
    color: '#ccc'
  },
});