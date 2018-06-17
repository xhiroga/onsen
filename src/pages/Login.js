import React, { Component } from 'react';
import { UIManager, LayoutAnimation, Alert, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#15192d'
  },
  circle: {
    width:264,
    height:266,
    marginBottom:60
  },
  message: {
    width:230,
    height:69
  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:50,
    paddingTop:22,
    paddingBottom:21,
    backgroundColor:'#1b1f36',
    width: '100%',
  },
  loginText:{
    color:'#fff',
    textAlign:'center',
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
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.circle} source={require('../../img/top_hero.png')} />
        <Image style={styles.message} source={require('../../img/top_text.png')} />
        <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => Actions.TshirtsList()}>
            <Text style={styles.loginText}>Spotifyでログイン</Text>
        </TouchableOpacity>
        <View>
         <Text style={styles.toc}>利用規約</Text>
        </View>
      </View>
    );
  }
}
