import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import PhoneNumbers from './phoneNumbers.js'
import styles from "./styles.js"
import Food from './food.js'
import Shelter from './shelter.js'



class Services extends React.Component {
  constructor(props){
    super(props)
    this.state={
      foodServices: [],
      shelterServices: [],
      showFoodServices: false,
      showShelterServices: false,
      showOpenFood:true,
      notDisplayingShelters:true

    }
  }
//sets state based on current location this is included with react native
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    setTimeout(() => {this.getServicesByProximityToLocation()}, 2000)
  }

  getServicesByProximityToLocation = () => {

   fetch('https://pps-backend.herokuapp.com/servicesbydistance',{
     body:JSON.stringify(this.state),
     method: 'PUT',
     headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
     }).then(data => data.json())
        .then(jsonData => this.sortServices(jsonData)
        )
      }

    sortServices = (jsonData) => {
      jsonData.map((service=>{
       if (service.service_type === 'food'){
            this.setState(prevstate=>{
              prevstate.foodServices.push(service)
              return {
                foodServices:prevstate.foodServices
              }
            })
       } else if (service.service_type === 'shelter'){
         this.setState(prevstate=>{
           prevstate.shelterServices.push(service)
           return {
             shelterServices:prevstate.shelterServices
           }
         })
       }
      }))

    }
showFoodService = () => {
  this.setState({
    showFoodServices: true,
    showShelterServices: false,
    notDisplayingShelters:true,
  })
}
showShelters = () => {
  this.setState({
    showShelterServices:true,
    showFoodServices:false,
    showOpenFood:true,
    notDisplayingShelters:false

  })
}

setStateToShowOpenFood = () => {
  this.setState({
    showOpenFood: true,

  })
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style = {styles.subHeaders}>Services Screen</Text>

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {this.showFoodService()}}>
          <Text style={{fontWeight:'bold'}}> Food </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {this.showShelters()}}>
            <Text style={{fontWeight:'bold'}}> Shelter </Text>
            </TouchableOpacity>
        <Food

          foodServices = {this.state.foodServices}
          showFoodServices = {this.state.showFoodServices}
          showShelters = {this.state.showShelterServices}
          handleSettingThisState = {this.setStateToShowOpenFood}
          showFood ={this.state.showOpenFood}
          notDisplayingShelters={this.state.notDisplayingShelters}

           />
        <Shelter
          shelterServices = {this.state.shelterServices}
          showShelters = {this.state.showShelterServices}
        />



      </View>
    );
  }
}

export default Services
