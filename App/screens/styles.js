import { StyleSheet, Dimensions } from 'react-native'

export default styles = StyleSheet.create({
  loginButton: {

  },
  accountActionSignup: {

  },
  wrapper: {
  },
  camera: {
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {

  },
  loginButtons: {
    backgroundColor: 'black',
    flex: 1
  },
  googleSignIn: {
    width: 300,
    height: 50,
    margin: 10
  },
  facebookSignIn: {
    width: 300,
    height: 50,
    margin: 10
  },
  startCapture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startCaptureText: {
  }
})