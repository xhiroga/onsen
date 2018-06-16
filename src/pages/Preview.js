import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
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
    console.log(props.shirtData);
    this.state = { isArtbord: true };
  }

  // 商品を入稿する
  registerItem = ({ shirtData }) => {
    console.log(shirtData);
    suzuriClient.post("/materials", {
      texture: shirtData['img-art'],
      title: "hogemaru",
      products : [{
        itemId : 1,
        published : true,
        resizeMode : "contain"
      }]
    })
    .then(res => console.log('Registered'))
    .catch(err => {
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

  // render = ({ shirtData }) => (
  render() {
    const { shirtData } = this.props;
    return (
      <View>
        {
          this.state.isArtbord
          ? <Tshirt source={{ uri: shirtData['img-art'] }} />
          : <Tshirt source={{ uri: shirtData['img-llc'] }} />
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