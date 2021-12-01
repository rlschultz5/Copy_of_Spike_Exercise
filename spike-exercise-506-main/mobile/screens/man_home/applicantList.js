import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import API from "../../api"
import AsyncStorage from '@react-native-async-storage/async-storage';

//import applicationCell from './applicationCell';
//import applicationCell from "./applicationCell";

const dummy = ["CELINA", "AVERY", "CHRIS"]

//TODO isLoading state and also wait till API is ready and fully link.
const ApplicantList = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {

    const getApplication = async () => {
      
      try {
        let user = await JSON.parse(await AsyncStorage.getItem('user'))
        let res = await axios.post(`http://${API}:8080/api/application/get`, {
          owner: user.id
        })
        setApplications(res.data);
        
      } catch (e) {
        console.log(e.message)
      }
    }
    getApplication();
  },[submitted])

  const onAccept = async (application_id) => {
    try {
      let res = await axios.post(`http://${API}:8080/api/application/accept`, {
        application_id: application_id
      })
      setSubmitted(!submitted);
    } catch (e) {
      console.log(e.message)
    }
  }

  const onDeny = async (application_id) => {
    try {
      let res = await axios.post(`http://${API}:8080/api/application/deny`, {
        application_id: application_id
      })
      setSubmitted(!submitted);
    } catch (e) {
      console.log(e.message)
    }
  }

  console.log(navigation)
  return (
    <ScrollView >
      {applications.map((application, key) => {
        return (
        <TouchableWithoutFeedback key={key} onPress={() => { navigation.navigate("HomeStack", { screen: "Detail", params: { applicant: application } }) }}>
        <View style={{ marginTop: 25, width: 320 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, marginRight: 100 }}>
              {application.name}
            </Text>
            <Button title="Accept" onPress={()=>{onAccept(application._id)}} style={{ flex: 1, alignSelf: "flex-end" }} />
            <Button title="Deny" onPress={()=>{onDeny(application._id)}} style={{ flex: 1, alignSelf: "flex-end" }} />
          </View>
          <Text style={{color:"gray"}}>{application.address}</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginTop: 20
            }}
          />
        </View>

      </TouchableWithoutFeedback>)
      })}
    </ScrollView>
  );
}

/*<ScrollView style={{flex:1}}>
{dummy.map((application)=> {
  <Text>{application}</Text>
})}
/*</ScrollView>*/
export default ApplicantList;

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



