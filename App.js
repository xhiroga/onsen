import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TopNavBar from './src/components/TopNavBar';
import { Login, Preview, TshirtsList, SelectPlayList  } from './src/pages';
import { Scene, Router } from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
      <Router style={styles.container}>
        <Scene key="root">
          <Scene key="Login" component={Login} navBar={TopNavBar} initial/>
          <Scene key="TshirtsList" component={TshirtsList} />
          <Scene key="SelectPlayList" component={SelectPlayList} />
          <Scene key="Preview" component={Preview} />
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
