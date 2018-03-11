import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
var Icon = require('react-native-vector-icons/FontAwesome');

export default class FBLoginView extends Component {
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