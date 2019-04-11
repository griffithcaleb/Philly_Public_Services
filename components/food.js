
import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity,Linking,Switch} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import styles from "./styles.js"
import phoneArgs from './phoneArgs.js'




class Food extends React.Component {
  constructor(props){
    super(props)
    this.state = {

      foodServices: this.props.foodServices,
      onlyShowOpen: false,
      switch1Value: false,
      openFood: [],
      doNotShowOpen: true

    }
  }
//npm package
  makeCall = ()=>{
    call(phoneArgs).catch(console.error)
  }


  //handles phone number change based on pressed button and makes call

  handlePhoneNumberChange = (number)=>{
    // console.log(number);
    phoneArgs.number = number
    this.makeCall()
  }

 toggleOpen = () => {
   this.props.handleSettingThisState()
   this.setState({
     doNotShowOpen:!this.state.doNotShowOpen,
     onlyShowOpen: !this.state.onlyShowOpen,
     switch1Value: !this.state.switch1Value
   })
 }
  componentDidMount(){
    services = this.state.foodServices
    const sortServicesOutsideOfSetTimeout = () => {
      this.sortServices(services)
    }
    setTimeout(function(){
      sortServicesOutsideOfSetTimeout()
    },3500)
  }

  sortServices = (services) => {
    let openFood = []
    for (var i = 0; i < services.length; i++) {
      if(services[i].open === true){
        openFood.push(services[i])
      }
    }
    this.setState({
      openFood: openFood
    })
    // console.log(this.state);
  }

  render() {

    let moment = require('moment-timezone');
    let distanceWithoutCommas
    let view

    //handling the view for open or closed showFood is for all services only open shows only the current places open

    const onlyOpen =
    <View style={styles.container}>
    <Text
    style={{fontSize:10, color:'green', fontWeight:'bold',paddingBottom:5}}> Toggle to see ALL locations. </Text>
    <Switch
    style = {{paddingBottom:50}}
    onValueChange = {this.toggleOpen}
    value = {this.state.switch1Value}/>
      <>{this.state.openFood.map((service,index)=>{
        // for handling the location of google maps search on press of address
          let searchUrl = service.physical_address.split(' ')
          searchUrl.push('Philadelphia', 'PA')
          var quotedAndPlusSigns = "'" + searchUrl.join("'+'") + "'";

          let url = 'https://www.google.com/maps/search/' + quotedAndPlusSigns



          //handling distace from current geolocation

        if (service.distance !== null ){
        let splitTheDistance = service.distance.split('')
        let distance
          for (var i = 0; i < splitTheDistance.length; i++) {
             if (splitTheDistance[i] === '.'){
             distance = splitTheDistance.slice(0,i+3).join()
            }
          }
           distanceWithoutCommas = <Text style ={{fontStyle:'italic',fontWeight:'bold'}} > {distance.replace(/,/g,"")} Miles </Text>
        } else {
          distanceWithoutCommas = <Text style={{color:"red",fontStyle:'italic',fontWeight:'bold'}}>please activate location services</Text>
        }
        return(

            <View style={{

              borderBottomWidth: 2,
              borderColor: 'black',
              padding: 5,
              alignItems: 'center',
              width:300
            }}

              key={index}>

            <Text style={styles.itemHeader}> {service.name} </Text>
            <Text
            onPress={() => Linking.openURL(url)}
            style={styles.address,{color:'blue', fontSize: 15, paddingTop: 10, paddingBottom: 10, fontWeight:'bold'}}>
            {service.physical_address}</Text>
            <Text >Time of Meals: </Text>
            <Text style={styles.info} >{service.primary_information}</Text>
            <Text style={styles.distance}>Distance: </Text>
            <Text style={{paddingBottom:10}}>{distanceWithoutCommas}</Text>
            <Text style={{fontWeight:'bold',color:'green'}}> Open </Text>
            <TouchableOpacity
            style={styles.callButtons}
            onPress={() => {
              this.handlePhoneNumberChange(service.phone_number)
            }}>
            <Text style={{color:'white'}}>Call</Text>
            </TouchableOpacity>
            </View>
          )
      })}
      </>
    </View>

    //handling the view for open or closed showFood is for all services

    const showFood =
          <View style={styles.container}>
          <Text
          style={{fontSize:10, color:'green', fontWeight:'bold',paddingBottom:5}}> Toggle to see OPEN locations. </Text>
          <Switch
          style = {{paddingBottom:50}}
          onValueChange = {this.toggleOpen}
          value = {this.state.switch1Value}/>
          <>{this.props.foodServices.map((service,index)=>{


          // for handling the location of google maps search on press of address
            let searchUrl = service.physical_address.split(' ')
            searchUrl.push('Philadelphia', 'PA')
            var quotedAndPlusSigns = "'" + searchUrl.join("'+'") + "'";

            let url = 'https://www.google.com/maps/search/' + quotedAndPlusSigns



            //handling distace from current geolocation

          if (service.distance !== null ){
          let splitTheDistance = service.distance.split('')
          let distance
            for (var i = 0; i < splitTheDistance.length; i++) {
               if (splitTheDistance[i] === '.'){
               distance = splitTheDistance.slice(0,i+3).join()
              }
            }
             distanceWithoutCommas = <Text style ={{fontStyle:'italic',fontWeight:'bold'}} > {distance.replace(/,/g,"")} Miles </Text>
          } else {
            distanceWithoutCommas = <Text style={{color:"red",fontStyle:'italic',fontWeight:'bold'}}>please activate location services</Text>
          }

            //handling open or closed
            //start_time
            let startTimeSum = 0
            let startTime = service.start_time.split('')
            let firstTwo = startTime.slice(0,2).join()
            let firstTwoWithoutCommas = firstTwo.replace(/,/g,"")
            let hoursInMinutes = Number(firstTwoWithoutCommas) * 60
                startTimeSum+= hoursInMinutes
            let lastTwo = startTime.slice(3,5).join()
            let lastTwoWithoutCommas = lastTwo.replace(/,/g,"")
                startTimeSum += Number(lastTwoWithoutCommas)
            //end_time
            let endTimeSum = 0
            let endTime = service.end_time.split('')
            let endTimeFirstTwo = endTime.slice(0,2).join()
            let endTimeFirstTwoWithoutCommas = endTimeFirstTwo.replace(/,/g,"")
            let endTimeHoursInMinutes = Number(endTimeFirstTwoWithoutCommas) *60
                endTimeSum += endTimeHoursInMinutes
            let endTimeLastTwo = endTime.slice(3,5).join()
            let endTimeLastTwoWithoutCommas = endTimeLastTwo.replace(/,/g,"")
                endTimeSum += Number(endTimeLastTwoWithoutCommas)

              let currentTime = moment().tz('America/New_York').format('HH:mm')
              let currentDay = moment().format('dddd')
              // console.log(currentTime);

            let currentTimeSum = 0
            let currentTimeSplit = currentTime.split('')
            let currentTimeFirstTwo = currentTimeSplit.slice(0,2).join()
            let currentTimeFirstTwoWithoutCommas = currentTimeFirstTwo.replace(/,/g,"")
            let currentTimeHoursInMinutes = Number(currentTimeFirstTwoWithoutCommas) *60
                  currentTimeSum += currentTimeHoursInMinutes
            let currentTimeLastTwo = currentTimeSplit.slice(3,5).join()
            let currentTimeLastTwoWithoutCommas = currentTimeLastTwo.replace(/,/g,"")
                  currentTimeSum += Number(currentTimeLastTwoWithoutCommas)

          // handling if today is a day that the place is serving
          let daysServing = service.days_open.split(' ')


          let openToday = false
          const checkOpenToday = () => {
            for (var i = 0; i < daysServing.length; i++) {
              // console.log(daysServing[i])
              // console.log(currentDay);
                if (daysServing[i] === currentDay){
                  openToday = true

                }
              }
          }
          // calling function on pageload
          checkOpenToday()



            const openOrClosed = ()=>{

              if((currentTimeSum < endTimeSum) && (currentTimeSum > startTimeSum) && (openToday)){
                    service.open = true


                return(<Text style={{color:'green',fontWeight:'bold',fontSize:16}}>Open</Text>);
            } else{
                 service.open = false
              return(<Text style={{color:'red',fontWeight:'bold',fontSize:16}}>Closed</Text>);
            }

            }



            return(

                <View style={{

                  borderBottomWidth: 2,
                  borderColor: 'black',
                  padding: 5,
                  alignItems: 'center',
                  width:300
                }}

                  key={index}>

                <Text style={styles.itemHeader}> {service.name} </Text>
                <Text
                onPress={() => Linking.openURL(url)}
                style={styles.address,{color:'blue', fontSize: 15, paddingTop: 10, paddingBottom: 10, fontWeight:'bold'}}>
                {service.physical_address}</Text>
                <Text >Time of Meals: </Text>
                <Text style={styles.info} >{service.primary_information}</Text>
                <Text style={styles.distance}>Distance: </Text>
                <Text style={{paddingBottom:10}}>{distanceWithoutCommas}</Text>
                <Text style={{fontWeight:'bold'}}>Currently: {openOrClosed()} </Text>
                <TouchableOpacity
                style={styles.callButtons}
                onPress={() => {
                  this.handlePhoneNumberChange(service.phone_number)
                }}>
                <Text style={{color:'white'}}>Call</Text>
                </TouchableOpacity>
                </View>
              )
            })}
            </>

           </View>


     if ((this.props.showFoodServices && this.state.doNotShowOpen)){
       view = showFood
     } else if ((this.state.onlyShowOpen && this.props.showFood && this.props.notDisplayingShelters)){
         view = onlyOpen
     }
    return (
            <ScrollView>

              <Text
              style ={{fontStyle:'italic',paddingBottom:20,textAlign:'center'}}>
              Services listed by proximity to current location.
              </Text>

                      {view}

            </ScrollView>

    );
  }
}

export default Food
