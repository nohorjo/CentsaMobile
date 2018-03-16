import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
  } from 'react-native';
import PropTypes from 'prop-types';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

var Icon = require('react-native-vector-icons/FontAwesome');

import { authenticate } from './Remote';

const loginError = () => Alert.alert("Error with Facebook login");
const nothing = () => null;

async function login(e) {
  if (e.type == 'success' && await authenticate(e)) {
  } else {
    loginError();
  }
}

export default class FBLoginView extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Centsa
          </Text>
                <FBLogin
                    buttonView={<FBLoginButton />}
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

class FBLoginButton extends Component {
    static contextTypes = {
        isLoggedIn: PropTypes.bool,
        login: PropTypes.func,
        logout: PropTypes.func,
        props: PropTypes.shape({})
    };

    constructor(props) {
        super(props);
        this.message = 'Login with Facebook';
    }

    render() {
        return (
            <View>
                <Icon.Button onPress={() => {
                    if (!this.context.isLoggedIn) {
                        this.context.login();
                        this.message = 'Login with Facebook';
                    } else {
                        this.context.logout();
                        this.message = 'Logout';
                    }

                }}
                    name="facebook" backgroundColor={"#3b5998"} >
                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: "#ffffff" }}>
                        {this.message}
                    </Text>
                </Icon.Button>
            </View>
        )
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
  