
import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import styles from './styles.js'
import phoneArgs from './phoneArgs.js'

class PhoneNumbers extends React.Component {

  makeCall = ()=>{
    call(phoneArgs).catch(console.error)
  }

  //handles phone number change based on pressed button and makes call

  handlePhoneNumberChange = (number)=>{
    phoneArgs.number = number
    this.makeCall()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.phoneHeaders}>Important Phone Numbers</Text>
        <Text style={styles.subHeaders}>Press to call</Text>
        <TouchableOpacity
        style = {styles.phoneButtons}
        onPress={() => this.handlePhoneNumberChange('18667233014')}>
        <Text> Domestic Violence Hotline </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.phoneButtons}
        onPress={() => this.handlePhoneNumberChange('2152321984')}>
        <Text> Homeless Outreach </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.phoneButtons}
        onPress={() => this.handlePhoneNumberChange('18774243838')}>
        <Text> Veteran Homelessness </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.phoneButtons}
        onPress={() => this.handlePhoneNumberChange('18002738255')}>
        <Text> National Suicide Hotline</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default PhoneNumbers
