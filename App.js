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

async function login(e) {
  if (e.type == 'success') {
    //FIXME: replace with actual host for prod
    const resp = await fetch("http://192.168.1.10:8080/fb", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userID: e.credentials.userId,
        accessToken: e.credentials.token
      }),
      credentials: 'include'
    });
    if (resp.ok) {
      const connectSid = resp.headers.map["set-cookie"][0].split(";").find(c => c.startsWith("connect.sid")).split("=")[1];
      //TODO: store this somewhere for future use
    } else {
      loginError();
    }
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
