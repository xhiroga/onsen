import React, { Component, PropTypes } from 'react';
import { View, Image, Alert, Dimensions, Linking } from 'react-native';
import { Content, Button, Text } from 'native-base';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { suzuriClient } from '../../utilities/apiClient';
import Modal from 'react-native-modal';

export default class Preview extends Component {
  constructor(props){
    super(props);
    this.state = {
      isArtbord: true,
      isOpenModal: false,
      modalTshirtUrl: ""
    };
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
    .then(res => {
      this.setState({
        isOpenModal: !this.state.isOpenModal,
        modalTshirtUrl: res.products.url
      });
      Actions.TshirtsList({type : 'reset' })
    })
    .catch(err => {
      console.log(err.request);
      Actions.TshirtsList({type : 'reset' })
    })
  }

  render() {
    const { shirtData } = this.props;
    const { isArtbord, isOpenModal } = this.state;
    return (
      <Container>
        <WhiteText style={{ fontSize: 20 }}>「{shirtData.title}」Tシャツ</WhiteText>
        {
          isArtbord
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
        <Modal
          isVisible={isOpenModal}
          style={{alignItems: "center"}}
        >
          <StyledButton onPress={() => Linking.openURL(modalTshirtUrl)}>
            <WhiteText>購入ページに飛ぶ</WhiteText>
          </StyledButton>
        </Modal>
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