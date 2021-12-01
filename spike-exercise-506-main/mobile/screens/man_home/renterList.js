import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView } from 'react-native';
//import renterCell from './renterCell';
//import renterCell from "./renterCell";
import UserAvatar from 'react-native-user-avatar';
import TextAvatar from 'react-native-text-avatar';
import axios from "axios";
import API from "../../api"
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummy = ["Cody Um", "Rob Sh", "Yajur G", "Sammy G", "Adi A"]


const RenterList = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const onRemove = async (application_id) => {
    try {
      let res = await axios.post(`http://${API}:8080/api/application/remove`, {
        application_id: application_id
      })
      setSubmitted(!submitted);
    } catch (e) {
      console.log(e.message)
    }
  }

  const onCharge = async (application) => {
    navigation.navigate("NavStack", { screen: "PaymentStack" , params:{screen:"Charge", params:{application:application}}});
  }
  useEffect(() => {
    const source = axios.CancelToken.source()
    let isMounted = true;

    const getApplication = async () => {

      try {
        let user = await JSON.parse(await AsyncStorage.getItem('user'))
        let res = await axios.post(`http://${API}:8080/api/application/getAccepted`, {
          owner: user.id
        })
        if (isMounted) setApplications(res.data);

      } catch (e) {
        console.log(e.message)
      }
    }
    getApplication();
    return () => {
      isMounted = false;
    }
  }, [submitted])

  return (
    <ScrollView style={{ marginTop: 20 }}>
      {applications.map((application, key) => {
        return <TouchableWithoutFeedback key={key} onPress={() => { navigation.navigate("HomeStack", { screen: "Detail", params: { applicant: application } }) }}>
          <View style={{ marginTop: 25, width: 300 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20 }}>
                {application.name}
              </Text>
              <Button onPress={() => { onCharge(application) }} title="charge" style={{ flex: 1, alignSelf: "flex-end" }} />
              <Button onPress={() => { onRemove(application._id) }} title="remove" style={{ flex: 1, alignSelf: "flex-end" }} />
            </View>
            <Text style={{ color: "gray" }}>{application.address} </Text>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginTop: 20
              }}
            />
          </View>

        </TouchableWithoutFeedback>
      })}
    </ScrollView>
  );
}

/*<ScrollView style={{flex:1}}>
{dummy.map((renter)=> {
  <Text>{renter}</Text>
})}
/*</ScrollView>*/
export default RenterList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});



