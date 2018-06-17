import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TopNavBar from './src/components/TopNavBar';
import { Login, Preview, TshirtsList, SelectPlayList  } from './src/pages';
import { Scene, Router } from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
      <Router style={styles.container}>
        <Scene key="root" navigationBarStyle={{ backgroundColor: '#15192D'}}  >
          <Scene key="Login" component={Login} navBar={TopNavBar} navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff'}} initial/>
          <Scene key="TshirtsList" title="Tシャツ一覧" navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff'}} component={TshirtsList} />
          <Scene key="SelectPlayList" title="プレイリストを選択" navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff'}} component={SelectPlayList} />
          <Scene key="Preview" title="Tシャツ一覧" navBarTitle={{ color: '#fff' }} barButtonTextTitle={{ color: '#fff'}} component={Preview} />
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
