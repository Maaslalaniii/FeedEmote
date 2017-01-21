import React, { Component } from 'react'
import { Navigator } from 'react-native'

import Login from './login'
import Recording from './recording'

const routes = [
  { title: 'Login', index: 0 },
  { title: 'Recording', index: 1}
]

export default class App extends Component {
  _renderScene(route, navigator) {
    switch (route.title) {
      case 'Login':
        return <Login routes={routes} navigator={navigator} />
        break
      case 'Recording':
        return <Recording routes={routes} navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight
          }
        }
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this._renderScene.bind(this)}
      />
    )
  }
}