import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import FBLoginView from './FBLoginView'

const loginError = () => Alert.alert("Error with Facebook login");

function log(e) {
  if (e.type == 'success') {
    // Send to server
    // {
    //   userId: e.credentials.userId,
    //   accessToken: e.credentials.token
    // }
  } else {
    loginError();
  }
}

const nothing = () => null;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Centsa
        </Text>
        <FBLogin
          buttonView={<FBLoginView />}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email"]}
          onLogin={log}
          onLoginFound={nothing}
          onLoginNotFound={loginError}
          onLogout={nothing}
          onCancel={loginError}
          onPermissionsMissing={loginError}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
});
