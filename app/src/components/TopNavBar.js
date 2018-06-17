import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

class TopNavBar extends Component {
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View>
        <StatusBar/>
      </View>
    );
  }

}
const styles = {
};

export default TopNavBar;
