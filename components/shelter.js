
import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import styles from "./styles.js"
import phoneArgs from './phoneArgs.js'


class Shelter extends React.Component {


  render() {
    let view
    const showShelters =
    <View>
    <>{this.props.shelterServices.map((service,index)=>{

        return(
          <View key={index}>
          <Text> Name: {service.name} </Text>
          <Text > Phone Number: {service.phone_number}</Text>
          <Text > Address: {service.physical_address}</Text>
          <Text > Time of Meals: {service.primary_information}</Text>
          <Text > Distance From Current Location: {service.distance}</Text>


          </View>
        )
      })}
      </>
     </View>

     if (this.props.showShelters){
       view = showFood
     }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {view}

      </View>
    );
  }
}

export default Shelter
