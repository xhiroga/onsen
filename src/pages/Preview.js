import React, { Component, PropTypes } from 'react';
import { View, Image, Alert } from 'react-native';
import { Content, Button, Text } from 'native-base';
import styled from 'styled-components';
import { suzuriClient } from '../../utilities/apiClient';

const Tshirt = styled(Image)`
  margin-top: 50px;
  width: 250px;
  height: 300px;
`;

export default class Preview extends Component {
  constructor(props){
    super(props);
    this.state = { isArtbord: true };
  }

  // 商品を入稿する
  registerItem = () => {
    // TODO: 入稿できるが400Errorがかえってくる
    const { shirtData } = this.props;
    suzuriClient.post("/materials", {
      texture: shirtData.imgArt,
      title: shirtData.title,
      products : [{
        itemId : 1,
        published : true,
        resizeMode : "contain"
      }]
    })
    .then(res => console.log(res))
    .catch(err => {
      console.log(err.request);
      Alert.alert(
       'Error',
       'Cannot register item',
       [{
         text: 'OK',
         onPress: () => console.log('OK Pressed'),
         style: 'default'
       }],
       { cancelable: false }
      );
    })
  }

  render() {
    const { shirtData } = this.props;
    return (
      <View>
        {
          this.state.isArtbord
          ? <Tshirt source={{ uri: shirtData.imgArt }} />
          : <Tshirt source={{ uri: shirtData.imgLlc }} />
        }
        <Button onPress={() => this.setState({ isArtbord: !this.state.isArtbord })}>
          <Text>歌詞</Text>
        </Button>
        <Button onPress={() => this.setState({ isArtbord: !this.state.isArtbord })}>
          <Text>アートワーク</Text>
        </Button>
        <Button onPress={() => this.registerItem()}>
          <Text>送信</Text>
        </Button>
      </View>
    )
  }

}