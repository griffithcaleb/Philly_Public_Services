
import React from 'react';
import {StyleSheet, Button, View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import call from 'react-native-phone-call'
import PhoneNumbers from './components/phoneNumbers.js'
import styles from "./components/styles.js"
import Services from './components/services.js'
import Food from './components/food.js'
import Shelter from './components/shelter.js'
import phoneArgs from './components/phoneArgs.js'


class HomeScreen extends React.Component {

makeCall = () => {
  phoneArgs.number = '2152321984'
  call(phoneArgs).catch(console.error)
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headers}>Philly Public Services</Text>
        <TouchableOpacity
        style = {styles.buttons}
        onPress={() => this.props.navigation.navigate('Services')}>
        <Text>Find Services </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.buttons}
        onPress={() => this.props.navigation.navigate('PhoneNumbers')}>
        <Text>Phone Numbers </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style= {styles.emergency}
          onPress={()=>this.makeCall()}>
        <Text> Code Blue Emergency Call </Text>
        </TouchableOpacity>
      </View>
    );
  }
}




// class Services extends React.Component {
//   constructor(props){
//     super(props)
//     this.state={
//       foodServices: [],
//       shelterServices: [],
//       showFoodServices: false,
//       showShelterServices: false,
//     }
//   }
// //sets state based on current location this is included with react native
//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           error: null,
//         });
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//     );
//     setTimeout(() => {this.getServicesByProximityToLocation()}, 2000)
//   }
//
//   getServicesByProximityToLocation = () => {
//
//    fetch('https://pps-backend.herokuapp.com/servicesbydistance',{
//      body:JSON.stringify(this.state),
//      method: 'PUT',
//      headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       }
//      }).then(data => data.json())
//         .then(jsonData => this.sortServices(jsonData)
//         )
//       }
//
//     sortServices = (jsonData) => {
//       jsonData.map((service=>{
//        if (service.service_type === 'food'){
//             this.setState(prevstate=>{
//               prevstate.foodServices.push(service)
//               return {
//                 foodServices:prevstate.foodServices
//               }
//             })
//        } else if (service.service_type === 'shelter'){
//          this.setState(prevstate=>{
//            prevstate.shelterServices.push(service)
//            return {
//              shelterServices:prevstate.shelterServices
//            }
//          })
//        }
//       }))
//
//     }
// showFoodService = () => {
//   this.setState({
//     showFoodServices: true,
//     showShelterServices: false,
//   })
// }
// showShelters = () => {
//   this.setState({
//     showShelterServices:true,
//     showFoodServices:false
//   })
// }
//
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style = {styles.subHeaders}>Services Screen</Text>
//
//         <TouchableOpacity
//           style={styles.buttons}
//           onPress={() => {this.showFoodService()}}>
//           <Text> Food </Text>
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             style={styles.buttons}
//             onPress={() => {this.showShelters()}}>
//             <Text> Shelter </Text>
//             </TouchableOpacity>
//         <Food
//
//           foodServices = {this.state.foodServices}
//           showFoodServices = {this.state.showFoodServices}
//            />
//         <Shelter
//           shelterServices = {this.state.shelterServices}
//           showShelters ={this.state.showFoodService}
//         />
//
//
//       </View>
//     );
//   }
// }






// class Food extends React.Component {
//
//
//   makeCall = ()=>{
//     call(phoneArgs).catch(console.error)
//   }
//
//   //handles phone number change based on pressed button and makes call
//
//   handlePhoneNumberChange = (number)=>{
//     console.log(number);
//     phoneArgs.number = number
//     this.makeCall()
//   }
//
//
//   render() {
//     var moment = require('moment-timezone');
//     let distanceWithoutCommas
//     let view
//     const showFood =
//           <View>
//           <>{this.props.foodServices.map((service,index)=>{
//           console.log(service.distance);
//           if (service.distance !== null ){
//           let splitTheDistance = service.distance.split('')
//           let distance
//             for (var i = 0; i < splitTheDistance.length; i++) {
//                if (splitTheDistance[i] === '.'){
//                distance = splitTheDistance.slice(0,i+3).join()
//               }
//             }
//              distanceWithoutCommas = <Text style ={{fontStyle:'italic',fontWeight:'bold'}} > {distance.replace(/,/g,"")} + Miles </Text>
//           } else {
//             distanceWithoutCommas = <Text style={{color:"red",fontStyle:'italic',fontWeight:'bold'}}>please activate location services</Text>
//           }
//
//             //handling open or closed
//             //start_time
//             let startTimeSum = 0
//             let startTime = service.start_time.split('')
//             let firstTwo = startTime.slice(0,2).join()
//             let firstTwoWithoutCommas = firstTwo.replace(/,/g,"")
//             let hoursInMinutes = Number(firstTwoWithoutCommas) * 60
//                 startTimeSum+= hoursInMinutes
//             let lastTwo = startTime.slice(3,5).join()
//             let lastTwoWithoutCommas = lastTwo.replace(/,/g,"")
//                 startTimeSum += Number(lastTwoWithoutCommas)
//             //end_time
//             let endTimeSum = 0
//             let endTime = service.end_time.split('')
//             let endTimeFirstTwo = endTime.slice(0,2).join()
//             let endTimeFirstTwoWithoutCommas = endTimeFirstTwo.replace(/,/g,"")
//             let endTimeHoursInMinutes = Number(endTimeFirstTwoWithoutCommas) *60
//                 endTimeSum += endTimeHoursInMinutes
//             let endTimeLastTwo = endTime.slice(3,5).join()
//             let endTimeLastTwoWithoutCommas = endTimeLastTwo.replace(/,/g,"")
//                 endTimeSum += Number(endTimeLastTwoWithoutCommas)
//
//               let currentTime = moment().tz('America/New_York').format('HH:mm')
//               let currentDay = moment().format('dddd')
//               // console.log(currentTime);
//
//             let currentTimeSum = 0
//             let currentTimeSplit = currentTime.split('')
//             let currentTimeFirstTwo = currentTimeSplit.slice(0,2).join()
//             let currentTimeFirstTwoWithoutCommas = currentTimeFirstTwo.replace(/,/g,"")
//             let currentTimeHoursInMinutes = Number(currentTimeFirstTwoWithoutCommas) *60
//                   currentTimeSum += currentTimeHoursInMinutes
//             let currentTimeLastTwo = currentTimeSplit.slice(3,5).join()
//             let currentTimeLastTwoWithoutCommas = currentTimeLastTwo.replace(/,/g,"")
//                   currentTimeSum += Number(currentTimeLastTwoWithoutCommas)
//
//           // handling if today is a day that the place is serving
//           let daysServing = service.days_open.split(' ')
//
//
//           let openToday = false
//           const checkOpenToday = () => {
//             for (var i = 0; i < daysServing.length; i++) {
//               // console.log(daysServing[i])
//               // console.log(currentDay);
//                 if (daysServing[i] === currentDay){
//                   openToday = true
//
//                 }
//               }
//           }
//           // calling function on pageload
//           checkOpenToday()
//
//
//
//             let openOrClosed = ()=>{
//               if((currentTimeSum < endTimeSum) && (currentTimeSum > startTimeSum) && (openToday)){
//               return(<Text style={{color:'green',fontWeight:'bold',fontSize:16}}>Open</Text>);
//             } else{
//               return(<Text style={{color:'red',fontWeight:'bold',fontSize:16}}>Closed</Text>);
//             }
//             }
//
//             return(
//
//                 <View style={{
//
//                   borderBottomWidth: 2,
//                   borderColor: 'black',
//                   padding: 5,
//                   alignItems: 'center'
//                 }}
//
//                   key={index}>
//                 <Text style ={{fontStyle:'italic',paddingBottom:20}}>Services listed by proximity to current location. </Text>
//                 <Text style={styles.itemHeader}> {service.name} </Text>
//                 <Text style={styles.address}>{service.physical_address}</Text>
//                 <Text > Time of Meals: </Text>
//                 <Text style={styles.info} >{service.primary_information}</Text>
//                 <Text style={styles.distance}> Distance: </Text>
//                 <Text style={{paddingBottom:10}}>{distanceWithoutCommas}</Text>
//                 <Text style={{fontWeight:'bold'}} > Currently: {openOrClosed()} </Text>
//                 <Button
//                 title="Call"
//                 onPress={() => {
//                   this.handlePhoneNumberChange(service.phone_number)
//                 }}
//                  />
//                 </View>
//               )
//             })}
//             </>
//            </View>
//
//      if (this.props.showFoodServices){
//        view = showFood
//      } else if (this.props.showShelters){
//
//      }
//     return (
// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//
//
//        {view}
// </View>
//
//     );
//   }
// }

// class Shelter extends React.Component {
//
//
//   render() {
//     let view
//     const showShelters =
//     <View>
//     <>{this.props.shelterServices.map((service,index)=>{
//
//         return(
//           <View key={index}>
//           <Text> Name: {service.name} </Text>
//           <Text > Phone Number: {service.phone_number}</Text>
//           <Text > Address: {service.physical_address}</Text>
//           <Text > Time of Meals: {service.primary_information}</Text>
//           <Text > Distance From Current Location: {service.distance}</Text>
//
//
//           </View>
//         )
//       })}
//       </>
//      </View>
//
//      if (this.props.showShelters){
//        view = showFood
//      }
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//
//       {view}
//
//       </View>
//     );
//   }
// }



const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    PhoneNumbers: {
      screen: PhoneNumbers,
    },
    Services:{
      screen: Services,
    },
    Food:{
      screen: Food,
    },
    Shelter:{
      screen: Shelter,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
