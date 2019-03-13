import React from 'react'
import { StyleSheet, Button, View,TouchableOpacity,Text, Linking,Alert} from 'react-native'
import email from 'react-native-email'
import styles from './styles.js'
import qs from 'qs'

class Email extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity
                style = {styles.buttons}
                onPress={this.handleEmail} >
                <Text style={{fontWeight:'bold'}} > Add Service</Text>
            </TouchableOpacity>
            </View>
        )
    }
// Credit for this goes to Tymchyk Maksym of Medium
    handleEmail = () => {
      async function sendEmail(to,subject,body,options={}){
        const {cc,bcc} = options
        let url = `mailto:${to}`


        const emailQuery = qs.stringify({
          subject: subject,
          body: body,
          cc: cc,
          bcc: bcc
        })

        if(emailQuery.length){
          url += `?${emailQuery}`
        }
        const canWeOpen = await Linking.canOpenURL(url)

        if (!canWeOpen) {

  }

  return Linking.openURL(url);
}


sendEmail(
    'griffith.caleb@gmail.com',
    'I would like to add my service to PPS',
    'Please include: name of service, address, phone number to this email body'
).then(() => {
    console.log('Our email successful provided to device mail ');
}).catch(error=>{
  Alert.alert('Install a mail client or email griffith.caleb@gmail.com for more information.')

})

}


}

export default Email
