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
import Geolocation from '@react-native-community/geolocation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function App() {

  state = {
    currentLongitude: 'unknown',//Initial Longitude
    currentLatitude: 'unknown',//Initial Latitude
  }

  const styles = useDynamicStyleSheet(dynamicStyles);
  
  componentDidMount = () => {
    var that =this;
    //Checking for the permission just after component loaded
    if(Platform.OS === 'ios'){
      this.callLocation(that);
    }else{
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err",err);
          console.warn(err)
        }
      }
      requestLocationPermission();
    }    
  }

  callLocation = (that) => {
  //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
        (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({ currentLongitude:currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({ currentLatitude:currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
    });
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  }
  
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