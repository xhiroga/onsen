import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Linking } from 'expo';
import { Actions, Scene, Router } from 'react-native-router-flux';
import TopNavBar from './src/components/TopNavBar';
import { Login, Preview, TshirtsList, SelectPlayList } from './src/pages';
import SpotifyClient from './utilities/SpotifyClient';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./config/env";

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.spotifyClient = new SpotifyClient({
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    })
  }

  async _setSpotifyClient(code, action) {
    await this.spotifyClient.setAccessRefreshToken(code);
    action()
  }

  componentDidMount() {
    Linking.addEventListener('url', (obj) => {
      let { path, queryParams } = Linking.parse(obj.url)
      if ('login' == path) {
        this._setSpotifyClient(queryParams.code, Actions.TshirtsList)
      }
      console.log(queryParams.code)
    })
  }

  render() {
    return (
      <Router style={styles.container}>
        <Scene key="root" navigationBarStyle={{ backgroundColor: '#15192D' }}  >
          <Scene key="Login" component={Login} navBar={TopNavBar} navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff' }} initial setAuth={this.setAuth} />
          <Scene key="TshirtsList" title="Tシャツ一覧" navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff' }} titleStyle={{ color: "#FFF" }} component={TshirtsList} />
          <Scene key="SelectPlayList" title="プレイリストを選択" navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff' }} titleStyle={{ color: "#FFF" }} component={SelectPlayList} spotifyClient={this.spotifyClient} />
          <Scene key="Preview" title="Tシャツ作成" navBarTitle={{ color: '#fff' }} titleStyle={{ color: "#FFF" }} barButtonTextTitle={{ color: '#fff' }} component={Preview} />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
