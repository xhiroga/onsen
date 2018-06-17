import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';

import { suzuriClient } from '../../utilities/apiClient';

export default class TshirtsList extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      productsErrors: "",
      isOpenModal: false,
      modalTshirtUrl: "test",
      modalTshirtTitle: "test"
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

  onPressShirt(e, product) {
    console.log(product);
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      modalTshirtUrl: product.sampleImageUrl.replace(/jpg/g, "png"),
      modalTshirtTitle: product.title
    });
  }

  onPressModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  renderMordal() {
    return (
      <TouchableHighlight
        onPress={() => this.onPressModal()}
      >
        <View
          style={{alignItems: "center", position: "relative"}}
        >
          <Image
            style={{width: 230, height: 230, position: "absolute", top: -130}}
            source={require('../../img/shirts_bg.png')}
          />
          {this.state.modalTshirtUrl != "test"
            && <Image style={{width: 230, height: 230, position: "absolute", top: -130}} source={{uri: this.state.modalTshirtUrl.replace(/jpg/g, "png")}} />
          }
          <Text style={{fontSize: 25, position: "absolute", color: "#fff", top: 130}}>
          {this.state.modalTshirtTitle}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render(){
    return (
      <View style={{position: "relative"}}>
        <ScrollView style={{backgroundColor: "#15192D"}}>
            {this.state.productsList.map((product, index) => {
              return (
                <View styles={{flexDirection: 'row', flex: 1}} key={index}>
                  <TouchableHighlight
                    key={product.id}
                    style={{alignItems: 'center'}}
                    onPress={(e) => this.onPressShirt(e, product)}
                  >
                    <Image
                      style={{width: 200, height: 200}}
                      source={{uri: product.sampleImageUrl.replace(/jpg/g, "png")}}
                    />
                  </TouchableHighlight>
                </View>
              );
            })}
        </ScrollView>
        <Button onPress={() => Actions.SelectPlayList()} style={{position: "absolute", bottom: 50, right: 40}}>
          <Image
            style={{width: 50, height: 50, backgroundColor: "#15192D", }}
            source={require('../../img/add_button.png')}
          />
        </Button>

        <Modal
          isVisible={this.state.isOpenModal}
          style={{alignItems: "center"}}
        >
          {this.renderMordal()}
        </Modal>
      </View>
    );
  }
}