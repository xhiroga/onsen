import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Alert,
  TouchableHighlight
} from 'react-native';

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
    apiClient.get("/tsgen?pl=" + playListId)
    .then(
      res => {
        console.log(res);
      })
    .catch(
      err => {
        console.log(err);
      })
  }

  render(){
    return (
      <View>
      {this.state.playLists.map(playList => (
        <TouchableHighlight
          key={playList.id}
          onPress={() => {
            this.onPress(playList.id);
          }}
        >
        <View>
          <Image
            style={{width: 200, height: 200}}
            source={{uri: playList.images[0].url}}
          />
          <Text>{playList.owner.display_name}</Text>
        </View>
        </TouchableHighlight>
      ))}
      </View>
    );
  }
}