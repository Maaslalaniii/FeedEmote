import React, { Component, TouchableOpacity } from 'react'
import { View, Text } from 'react-native'

import Camera from 'react-native-camera'
// import fs from 'react-native-fs'
const FileUpload = require('NativeModules').FileUpload


export default class Recording extends Component {

  constructor(props) {
    super(props)
    this.state = {
      running: false
    }
  }

  _takePicture() {
    this.camera.capture()
      .then((data) => {
        let obj = {
          uploadUrl: 'http://142.150.208.170/upload/',
          method: 'POST', // default 'POST',support 'POST' and 'PUT'
          headers: {
            'Accept': 'application/json',
          },
          fields: {
            'hello': 'world',
          },
          files: [
            {
              filename: 'IMG.jpg', // require, file name
              filepath: data.path // require, file absoluete path
            }
          ]
        }
        FileUpload.upload(obj, function (err, result) {
          console.log('upload:', err, result);
        })
      })
  }

  _startButton() {
    return (
      <View style={styles.startCapture}>
        <Text onPress={() => {
          this.setState({running: true})
          setInterval(() => {
              this._takePicture()
            }, 5000)
          }} style={styles.startCaptureText}>
          START
        </Text>
      </View>
    )
  }

  _stopButton() {
    return (
      <View style={styles.stopCapture}>
        <Text onPress={() => {
            this.setState({running: false})
            clearInterval()
          }
        }>
          STOP
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, styles.camera]}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          } }
          captureQuality={Camera.constants.CaptureQuality.high}
          // orientation={Camera.constants.Orientation.landscapeLeft}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >

          {
            this.state.running ? this._stopButton() : this._startButton()
          }

        </Camera>
      </View>
    )
  }
}