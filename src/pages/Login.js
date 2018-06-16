import React, { Component } from 'react';
import { UIManager, LayoutAnimation, Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  loginScreenButton:{
    flex: 1,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#84bd00',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
    color:'#fff',
    textAlign:'center',
    fontWeight: 'bold',
    paddingLeft : 10,
    paddingRight : 10
  }
});

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => Actions.TshirtsList()}>
            <Text style={styles.loginText}>Log In with Spotify</Text>
        </TouchableOpacity>
      </View>
    );
  }
}