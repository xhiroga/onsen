import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeOnsen from './src/components/SwipeOnsen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 300, justifyContent: 'center'}}>
          <Text>温泉に行きたいぞ！！！</Text>
        </View>
        <SwipeOnsen/>
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
