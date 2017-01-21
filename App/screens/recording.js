import React, { Component, TouchableOpacity } from 'react'
import { View, Text } from 'react-native'

import Camera from 'react-native-camera'

export default class Recording extends Component {

  _takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <View style={[styles.container, styles.camera]}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          } }
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureQuality={Camera.constants.CaptureQuality.high}
          orientation={Camera.constants.Orientation.landscapeLeft}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >
          <View style={styles.startCapture}>
            <Text>CAPTURE</Text>
          </View>
        </Camera>
      </View>
    )
  }
}