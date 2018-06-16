import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
import { Content, Button, Text, Spinner } from 'native-base';
import styled from 'styled-components';
import { suzuriClient } from '../../utilities/apiClient';

const Tshirt = styled(Image)`
  margin-top: 50px;
  max-width: 250px;
  max-height: 300px;
`;

export default class Preview extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoad: false,
      texture: "",
      title: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoad: true })
    // NOTE: Dummy data
    this.setState({
      texture: 'https://i.gyazo.com/fd0e38b0336f03886a90135ce322ed13.png',
      title: '俺の夏2018'
    })
    this.setState({ isLoad: false })
  }

  registerItem = () => {
    const { texture, title } = this.state;
    suzuriClient.post("/materials", {
      texture,
      title,
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

  render() {
    return (
      <View>
        <Content>
          {this.state.isLoad
            ?
              <Spinner />
            :
              <View>
                <Tshirt
                  source={require('../../img/Tshirt.png')}
                />
                <Button>
                  <Text>歌詞</Text>
                </Button>
                <Button>
                  <Text>アートワーク</Text>
                </Button>
                <Button onPress={() => this.registerItem()}>
                  <Text>送信</Text>
                </Button>
              </View>
          }
        </Content>
      </View>
    );
  }
}