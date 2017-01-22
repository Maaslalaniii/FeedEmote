import React, { Component, TouchableOpacity } from 'react'
import { View, Text } from 'react-native'

import Camera from 'react-native-camera'
// import fs from 'react-native-fs'
const FileUpload = require('NativeModules').FileUpload

let interval

export default class Recording extends Component {
  componentWillMount() {
    fetch(`http://142.150.208.170/addpr?userid=${this.state.uid}`)
      .then((response) => response.json())
      .then((responseJSON) => this.setState({ pr_id: responseJSON.pr_key }))
      .catch((error) => console.log(error))
  }

  constructor(props) {
    super(props)
    this.state = {
      running: false,
      presentationId: '',
      uid: 'NHHePgE5P4MTRUjcY8EmeNXvoys1',
      pr_id: ''
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
            'userid': this.state.uid,
            'pr_id': this.state.pr_id
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
          this.setState({ running: true })
          interval = setInterval(() => {
            this._takePicture()
          }, 5000)
        } } style={styles.startCaptureText}>
          START
        </Text>
      </View>
    )
  }

  _stopButton() {
    return (
      <View style={styles.stopCapture}>
        <Text onPress={() => {
          this.setState({ running: false })
          clearInterval(interval)
          fetch(`http://142.150.208.170/endpr?userid=${this.state.uid}`)
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
          captureTarget={Camera.constants.CaptureTarget.temp}
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