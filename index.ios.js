'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Image,
  StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
var RNFS = require('react-native-fs');
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

class CamScreen extends Component {

  static navigationOptions = {
    header: {
      visible: false,
    },
    tabBarLabel: 'Cam',
    tabBarIcon: () => (
      <Image
        source={require('./favicon.png')}
        style={styles.icon}
        />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      features: [],
      featureIndex: 0,
      recognized: false,
      cameraType: 'back'
    };
  }

  switchCamera(){
    if(this.state.cameraType === 'back'){
      this.setState({cameraType: 'front'})
    }else{
      this.setState({cameraType: 'back'})
    }
  }

  incrementFeature(){
    this.setState({featureIndex: (this.state.featureIndex + 1)})
  }

  tryAgain(){
    this.setState({featureIndex: 0, features: [], recognized: false})
  }

  renderFeatures(){
    return(
      <View style={{marginTop: 50}}>
        <Text
          style={{margin: 20, padding:20, borderStyle: 'solid', borderWidth: 2, borderRadius: 4, textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}
          >
          It's a {this.state.features[(this.state.featureIndex % 4)]['description']}
        </Text>
        <Text
          style={{margin: 20, padding:20, borderStyle: 'solid', borderWidth: 2, borderRadius: 4, textAlign: 'center'}}
          onPress={this.incrementFeature.bind(this)}>
          What else?
        </Text>
        <Text
          style={{margin: 20, padding:20, borderStyle: 'solid', borderWidth: 2, borderRadius: 4, textAlign: 'center'}}
          onPress={() => this.tryAgain()}>
          Another One
        </Text>
      </View>
    )
  }

  renderCamera(){
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Camera
          type={this.state.cameraType}
          ref={(cam) => {this.camera = cam}}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <Text style={styles.capture}
             onPress={this.takePicture.bind(this)}>
               <FontAwesome name="circle" size={100} color="white"/>
          </Text>
          <Text style={styles.switchcam} onPress={this.switchCamera.bind(this)}><Ionicon name="ios-reverse-camera" size={50} color="white" /></Text>
        </Camera>
      </View>
    );
  }

  renderYield(){
    if(this.state.recognized){
      return this.renderFeatures()
    }else{
      return this.renderCamera()
    }
  }

  render() {
    return this.renderYield()
  }

  postToGVision(img){

    const gcontent = `base64-encoded ${img}`

    const data = {
      "requests":[
        {
          "image":{
            "content": img
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults": 5
            }
          ]
        }
      ]
    }

    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCdCFZWviKDpPyLh9aeiu_QTU7MPixAdd0', {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({features: responseJson.responses[0]['labelAnnotations'], recognized: true})
    }).catch((error)=>{console.log(error)})

  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
    .then((data) => {

      RNFS.readFile(data.path, 'base64')
      .then(res => {
        this.postToGVision(res)
      })
      .catch(err => {
        console.log(err)
      })

    })
    .catch(err => console.error(err));
  }

}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
    tabBarLabel: 'Home',
    tabBarIcon: () => (
      <Image
        source={require('./favicon.png')}
        style={styles.icon}
        />
    ),
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          <Text style={{textAlign: 'center'}}>Hi again, firas!</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
      );
    }
  }

  class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      header: {
        visible: false,
      },
      tabBarLabel: 'Notifications',
      tabBarIcon: () => (
        <Image
          source={require('./favicon.png')}
          style={styles.icon}
          />
      ),
    };

    render() {
      return (
        <View style={styles.container}>
          <Button
            style={styles.container}
            onPress={() => this.props.navigation.goBack()}
            title="Go back home"
            />
          <FontAwesome name="rocket" size={30} color="#900" />
          <Ionicon name="ios-reverse-camera" size={30} color="#900" />
        </View>
      );
    }
  }

  const watdog = TabNavigator({
    Home: { screen: HomeScreen },
    Cam: { screen: CamScreen },
    Notifications: { screen: MyNotificationsScreen},
  }, {
    headerMode: 'screen',
    tabBarOptions: {
      tabBarVisible: false,
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'transparent',
      },
      indicatorStyle: 'transparent'
    },
    swipeEnabled: true,
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
});

AppRegistry.registerComponent('watdog', () => watdog);

{/*   <Button
  onPress={() => navigate('Cam')}
  title="Take a picture"
  />
  <Button
  onPress={() => navigate('Notifications')}
  title="Go to notifications"
  />  */}
