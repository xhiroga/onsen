import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    flex: 1
  }
})


export default class SwipeOnsen extends Component {
    render(){
      return (
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Image style={styles.image} source={require('../../img/img1.jpg')}/>
          </View>
          <View style={styles.slide2}>
            <Image style={styles.image} source={require('../../img/img2.jpg')}/>
          </View>
          <View style={styles.slide3}>
            <Image style={styles.image} source={require('../../img/img3.jpg')}/>
          </View>
        </Swiper>
      );
    }
  }