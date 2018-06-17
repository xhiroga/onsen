import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import Carousel from 'react-native-snap-carousel';
import { spotifyClient, apiClient } from '../../utilities/apiClient';

export default class TshirtsList extends Component {
  constructor() {
    super();
    this.state = {
      playLists: [],
      playListsErrors: ""
    }
  }

  componentDidMount() {
    spotifyClient.get("/me/playlists")
    .then(
      res => {
        if(res.status === 200) {

          // success

          console.log("success fetch playlist list");

          const payload = res.data.items;

          this.setState({
            playLists: payload
          });

        } else {

          // fail

          Alert.alert(
            'Error',
            'Cannot fetch spotify playLists',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default'},
            ],
            { cancelable: false }
          );

          this.setState({
            playListsErrors: "cannot fetch platyLists."
          });

        }
      }
    )
    .catch(err => {

      // fail

      Alert.alert(
            'Error',
            'Cannot fetch spotify playLists',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default'},
            ],
            { cancelable: false }
          );

      this.setState({
        playListsErrors: err
      });

    })
  }

  onPress(playListId) {
    console.log("AAAAAAAA");
    console.log(playListId);
    apiClient.get("/tsgen?pl=" + playListId)
    .then(
      res => {
        // success
        console.log("success fetch playlist list");
        const payload = res.data;
        Actions.Preview({ shirtData: payload });
      }
    ).catch(
      err => { console.log(err) }
    )
  }

   renderItem = ({ item }) => (
     <ItemContainer
       key={item.id}
       onPress={() => {this.onPress(item.id)}}
      >
       <MusicImage source={{uri: item.images[0].url}} />
       <WhiteText>{item.name}</WhiteText>
     </ItemContainer>
   );

  render(){
    return (
      <Container>
        {/* <BGImage
          source={require('../../img/shirts_bg.png')}
        /> */}
        <Carousel
          data={this.state.playLists}
          renderItem={this.renderItem}
          itemWidth={Dimensions.get("window").width * 0.85}
          sliderWidth={Dimensions.get("window").width}
          slideStyle={{ flex: 1 }}
          layout={'stack'}
          loop
        />
        <View style={{ flex: 1 }}>
          <StyledButton rounded>
            <WhiteText>決定</WhiteText>
          </StyledButton>
        </View>
      </Container>
    );
  }
}

const Container = styled(View)`
  height: 812px;
  width: 375px;
  background-color: #15192D;
`
const ItemContainer = styled(TouchableOpacity)`
  margin: 200px auto;
  margin-left: 40px;
`
const MusicImage = styled(Image)`
  width: 250px;
  height: 250px;
`
const StyledButton = styled(Button)`
  width: 300px;
  margin: 50px auto 0;
  background-color: #DA0023;
`
const BGImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`
const WhiteText = styled(Text)`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin: 25px auto 0;
  padding: 15px 30px;
  background-color: #DA0023;
  border-radius: 50px;
`

const styles = StyleSheet.create({
  carousel: { flex: 1 }
});