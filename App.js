import React, { Component, useState } from 'react';

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

export default function App() {

	const styles = useDynamicStyleSheet(dynamicStyles)
  
  return (
    <>
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
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
    </>
  );
}

const mapStyles = StyleSheet.create({

})

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

  content: {
    marginTop: 500,
    height: 200,
    width: Dimensions.get('window').width,
    //backgroundColor: new DynamicValue('#000000', '#f5f5f5')
  },

  cardview: {
    marginHorizontal: 10,
  },

  card: {
    borderRadius: 10,
    width: 300,
    height: 200,
    marginRight: 15,
    backgroundColor: new DynamicValue('#000000', '#f5f5f5')
  },

  bottomHeader: {
    color: '#f5f5f5'
  },
  BottomContainer: {
    color: '#ccc'
  },
});