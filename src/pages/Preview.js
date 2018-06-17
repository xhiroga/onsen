import React, { Component, PropTypes } from 'react';
import { View, Image, Alert, Dimensions } from 'react-native';
import { Content, Button, Text } from 'native-base';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { suzuriClient } from '../../utilities/apiClient';

export default class Preview extends Component {
  constructor(props){
    super(props);
    console.log(props.shirtData);
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
      <Container>
        <WhiteText style={{ fontSize: 20 }}>「{shirtData.title}」Tシャツ</WhiteText>
        {
          this.state.isArtbord
          ? <Tshirt source={{ uri: shirtData.tsArt }} />
          : <Tshirt source={{ uri: shirtData.tsLlc }} />
        }
        <ButtonWrapper>
          <StyledButton onPress={() => this.registerItem()}>
            <WhiteText>Tシャツを追加 </WhiteText>
          </StyledButton>
          <GhostButton onPress={() => Actions.pop()}>
            <WhiteText style={{ fontSize: 14 }}>今回はやめておく</WhiteText>
          </GhostButton>
        </ButtonWrapper>
      </Container>
    )
  }
}

const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #15192D;
  position: relative;
`
const Tshirt = styled(Image)`
  width: 250px;
  height: 300px;
  margin: 50px auto 20px;
`;
const ButtonWrapper = styled(View)`
  margin: 0 auto;
`
const StyledButton = styled(Button)`
  width: 80%;
  margin: 0 auto;
  background-color: #DA0023;
`
const GhostButton = styled(Button)`
  margin-top: 15px;
  width: 80%;
  margin: 0 auto;
  background-color: #262C4D;
`
const WhiteText = styled(Text)`
  color: #fff;
  font-size: 18px;
  padding: 15px 10px;
`