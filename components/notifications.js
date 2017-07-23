'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ShareButtons from './share.js';


export default class MyNotificationsScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    tabBarLabel: 'Notifications',
    tabBarIcon: () => (
      <Image
        source={require('../favicon.png')}
        style={styles.icon}
        />
    ),
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Grid style={{backgroundColor: '#F5FCFF'}}>
        <Row size={5}>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 40, }} >
                It's a
              </Text>
              <Text
                style={{
                  margin: 20,
                  padding:20,
                  borderStyle: 'solid',
                  borderWidth: 2,
                  borderRadius: 4,
                  textAlign: 'center',
                  fontSize: 40,
                  fontWeight: 'bold'}} >
                  SOMETHING
                </Text>
                <TouchableHighlight style={styles.button}>
                  <Text style={{color: 'white', textAlign:'center', fontSize: 16}}>What else?</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => navigate('Cam')}>
                  <Text style={{color: 'white', textAlign:'center', fontSize: 16}}>Try again</Text>
                </TouchableHighlight>
              </View>
            </Row>
            <Row size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
              <ShareButtons />
              {/*
              <TouchableHighlight style={[styles.sharebutton, styles.twitterbutton]}>
                <FontAwesome name="twitter" style={{color: 'white', textAlign:'center'}} size={15}/>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.sharebutton, styles.fbbutton]}>
                <FontAwesome name="facebook" style={{color: 'white', textAlign:'center'}} size={15}/>
              </TouchableHighlight>
              */}
            </Row>
          </Grid>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
      },
      capture: {
        flex: 0,
        backgroundColor: 'transparent',
      },
      switchcam: {
        backgroundColor: 'transparent',
      },
      icon: {
        width: 24,
        height: 24,
      },
      button: {
        margin: 10,
        borderRadius: 25,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 35,
        paddingVertical: 15,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
      sharebutton: {
        margin: 3,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
      },
      fbbutton: {
        backgroundColor: '#3b5998',
        borderColor: '#3b5998',
      },
      twitterbutton: {
        backgroundColor: '#00aced',
        borderColor: '#00aced',
      }
    });