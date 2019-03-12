
import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import styles from "./styles.js"
import phoneArgs from './phoneArgs.js'

class Shelter extends React.Component {


  makeCall = ()=>{
    call(phoneArgs).catch(console.error)
  }

  //handles phone number change based on pressed button and makes call

  handlePhoneNumberChange = (number)=>{
    console.log(number);
    phoneArgs.number = number
    this.makeCall()
  }


  render() {
    var moment = require('moment-timezone');
    let distanceWithoutCommas
    let view
    const showShelters =
          <View>
          <>{this.props.shelterServices.map((service,index)=>{
            // handling search url for location of shelter
            let searchUrl = service.physical_address.split(' ')
            searchUrl.push('Philadelphia', 'PA')
            var quotedAndPlusSigns = "'" + searchUrl.join("'+'") + "'";

            let url = 'https://www.google.com/maps/search/' + quotedAndPlusSigns



          if (service.distance !== null ){
          let splitTheDistance = service.distance.split('')
          let distance
            for (var i = 0; i < splitTheDistance.length; i++) {
               if (splitTheDistance[i] === '.'){
               distance = splitTheDistance.slice(0,i+3).join()
              }
            }
             distanceWithoutCommas = <Text style ={{fontStyle:'italic',fontWeight:'bold'}} > {distance.replace(/,/g,"")}  Miles </Text>
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



            let openOrClosed = ()=>{
              if((currentTimeSum < endTimeSum) && (currentTimeSum > startTimeSum) && (openToday)){
              return(<Text style={{color:'green',fontWeight:'bold',fontSize:16}}>Open</Text>);
            } else if ((currentTimeSum < endTimeSum) && (currentTimeSum > startTimeSum) && (!openToday)){
              return(<Text style={{color:'red',fontWeight:'bold',fontSize:16}}>Closed</Text>);
            } else {return(<Text style ={{color:'blue'}}> Please call for intake information </Text>)}
            }

            return(

                <View style={{

                  borderBottomWidth: 2,
                  borderColor: 'black',
                  padding: 5,
                  alignItems: 'center'
                }}

                  key={index}>
                <Text style ={{fontStyle:'italic',paddingBottom:20}}>Services listed by proximity to current location. </Text>
                <Text style={styles.itemHeader}> {service.name} </Text>
                <Text
                onPress={() => Linking.openURL(url)}
                style={styles.address,{color:'blue', fontSize: 15, paddingTop: 10, paddingBottom: 10, fontWeight:'bold'}}>
                {service.physical_address}</Text>
                <Text style={styles.distance}> Distance: </Text>
                <Text style={{paddingBottom:10}}>{distanceWithoutCommas}</Text>
                <Text style={{fontWeight:'bold'}} > Currently: {openOrClosed()} </Text>
                <Button
                title="Call"
                onPress={() => {
                  this.handlePhoneNumberChange(service.phone_number)
                }}
                 />
                 <Text > Intake Information: </Text>
                 // website here 
                 <Text style={{color: 'blue'}}
                  onPress={() => Linking.openURL(service.primary_information)}>
                  Additional Information
                  </Text>
                 </View>
              )
            })}
            </>
           </View>

     if (this.props.showShelters){
       view = showShelters
     } else if (this.props.showFoodServices){

     }
    return (
<ScrollView>


       {view}
</ScrollView>

    );
  }
}

export default Shelter
