import React, { Component } from 'react';
import { UIManager, LayoutAnimation, Alert, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Linking } from 'expo'
import { SPOTIFY_CLIENT_ID, AUTHORIZE_RIDIRECTION_URL } from "../../config/env";

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#15192d'
  },
  circle: {
    width: 264,
    height: 266,
    marginBottom: 60
  },
  message: {
    width: 230,
    height: 69
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
    paddingTop: 22,
    paddingBottom: 21,
    backgroundColor: '#1b1f36',
    width: '100%',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  toc: {
    marginTop: 50,
    textDecorationLine: 'underline',
    color: '#fff'
  }
});


export default class Login extends Component {

  _onPress() {
    const login_url = Linking.makeUrl('login')
    const url = SPOTIFY_AUTHORIZE_URL + '?client_id=' + SPOTIFY_CLIENT_ID
      + '&response_type=code&redirect_uri=' + encodeURIComponent(AUTHORIZE_RIDIRECTION_URL)
      + '&scope=user-read-private%20user-read-email&state=' + encodeURIComponent(login_url)
    console.log(url)
    Linking.openURL(url)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.circle} source={require('../../img/top_hero.png')} />
        <Image style={styles.message} source={require('../../img/top_text.png')} />
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={this._onPress}>
          <Text style={styles.loginText}>Spotifyでログイン</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.toc}>利用規約</Text>
        </View>
      </View>
    );
  }
}
