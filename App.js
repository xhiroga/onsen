import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeOnsen from './src/components/SwipeOnsen';
import { Preview } from './src/pages';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Preview/>
      </View>
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
