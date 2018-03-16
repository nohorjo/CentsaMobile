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
import { authenticate } from './Remote';

const loginError = () => Alert.alert("Error with Facebook login");

async function login(e) {
  if (!(e.type == 'success' && await authenticate(e))) {
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
          onLogin={login}
          onLoginFound={nothing}
          onLoginNotFound={nothing}
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
