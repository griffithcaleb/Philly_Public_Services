
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
   container:{
     flex: 1, alignItems: 'center'
   },
   headers:{
     fontWeight:'bold',
     fontSize: 30,
     paddingBottom: 100,
     paddingTop: 50
   },
   phoneHeaders:{
     fontWeight:'bold',
     textAlign: 'center',
     width: 200,
     fontSize: 20,
     paddingBottom: 100,
     paddingTop: 50
   },
   subHeaders:{
     fontWeight:'bold',
     fontSize: 15,
     paddingBottom: 25,
     paddingTop: 10
   },
   buttons:{
     borderRadius: 4,
     fontWeight: 'bold',
     borderWidth: 1,
     borderColor: 'black',
     padding:10,
     fontSize: 16,
     marginBottom:20,
     width: 135,
     alignItems: 'center'
   },
   callButtons:{
     borderRadius: 4,
     fontWeight: 'bold',
     borderWidth: 1,
     borderColor: 'black',
     padding:10,
     fontSize: 16,
     marginBottom:10,
     marginTop:15,
     width: 75,
     alignItems: 'center',
     backgroundColor: 'green'
   },
   phoneButtons:{
     width: 210,
     borderRadius: 4,
     borderWidth: 1,
     borderColor: 'black',
     padding:10,
     fontSize: 16,
     marginBottom:20,
     alignItems: 'center',
     fontWeight: 'bold'
   },
   emergency:{
     borderRadius: 4,
     borderWidth: 1,
     borderColor: 'black',
     padding:10,
     fontSize: 16,
     backgroundColor: 'red',
     marginBottom: 50

   },
   itemHeader:{
     fontSize: 16,
     fontWeight: 'bold',
     paddingBottom: 5,
     textDecorationLine: 'underline'
   },
   address:{
     fontSize:15,
     paddingBottom:5,
     fontWeight:'bold'
   },
   info:{
     fontSize:15,
     fontWeight: 'bold',
     paddingBottom:2,
     paddingTop: 5
   },
   distance:{
     fontSize: 15,

     paddingTop: 10

   }
});
export default styles
