import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
Linking,
Vibration,
Dimensions,
TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';

import { Button, Header } from './src/components/common';

export default class App extends Component {
  state = {
    result: '',
    cameraType: Camera.constants.Type.back
  }

  _handleBarCodeRead(e) {
      Vibration.vibrate();
      this.setState({ result: e.data });    
      return;
  }  

  getLink(){
    const { result } = this.state;
    if(result.startsWith('http://') || result.startsWith('https://')){
      Linking.openURL(result).catch(err => console.error('An error occured', err));
    }
  }
  
  renderResult(){
    if(this.state.result !== ''){
      return (
        <TouchableOpacity  style = {styles.resultContainer} onPress = {this.getLink.bind(this)}>
          <Text style = {styles.resultText}>{this.state.result}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.section1} >
          <Header headerText='QRCode Scanner' />
          <Camera style={styles.camera} type={this.state.cameraType} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}/>
            </View>            
          </Camera>
        </View>
        
        <View style = {styles.section2}>
          {this.renderResult()}
        </View>
                        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  section1: {
    flex: 4, 
    alignItems: 'center'
  },
  section2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultContainer: {
    borderRadius: 5,
    backgroundColor: '#1dd1e1'
  },
  resultText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    margin: 10,
  },

  camera: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  }
});
