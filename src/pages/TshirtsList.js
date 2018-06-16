import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Alert
} from 'react-native';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { suzuriClient } from '../../utilities/apiClient';

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
  }
})


export default class TshirtsList extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      productsErrors: ""
    }
  }

  componentDidMount() {
    suzuriClient.get("/products?userId=212030")
    .then(
      res => {
        if(res.status === 200) {

          // success

          console.log("success fetch product list");

          const payload = res.data.products;

          this.setState({
            productsList: payload
          });

        } else {

          // fail

          Alert.alert(
            'Error',
            'Cannot fetch suzuri products',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default'},
            ],
            { cancelable: false }
          );

          this.setState({
            productsErrors: "cannot fetch products."
          });

        }
      }
    )
    .catch(err => {
      // fail

      Alert.alert(
            'Error',
            'Cannot fetch suzuri products',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default'},
            ],
            { cancelable: false }
          );

      this.setState({
        productsErrors: "cannot fetch products."
      });

    })
  }

  render(){
    return (
      <View>
      {this.state.productsList.map(product => (
        <View
          key={product.id}
        >
          <Image
            style={{width: 100, height: 100}}
            source={{uri: product.sampleImageUrl}}
          />
          <Text>{product.title}</Text>
        </View>
      ))}
      <Button onPress={() => Actions.SelectPlayList()}>
        <Text>プレイリストを選択</Text>
      </Button>
      </View>
    );
  }
}