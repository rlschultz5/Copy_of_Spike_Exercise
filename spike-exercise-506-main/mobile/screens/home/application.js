import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, TextInput, ScrollView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import PropertyDetail from './propertyDetail';
import PropertyList from "./propertyList"
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../api";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";



const Application = ({ route, navigation }) => {

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [ssn, setSsn] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [exp, setExp] = useState();
  const [cvv, setCvv] = useState();
  const [user_id, setUser_Id] = useState();
  const [property, setProperty] = useState();
  const [propertyList, setPropertyList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState();
  const [roomNumber, setRoomNumber] = useState();


  useEffect(() => {
    async function getUserData() {
      console.log(route.params.management)
      try {
        let userDataTemp = JSON.parse(await AsyncStorage.getItem('user'));
        setUserData(userDataTemp);
        setName(userDataTemp.name);
        setAddress(userDataTemp.address);
        setNumber(userDataTemp.number);
        setCardNumber(userDataTemp.payment_info.card_number);
        setExp(userDataTemp.payment_info.expiry_date);
        setCvv(userDataTemp.payment_info.cvv);
        setPropertyList(userDataTemp.property);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [])

  const onSubmit = () => {
    setDisabled(true);
    let res = axios.post(`http://${API}:8080/api/application/apply`, {
      name: name,
      address: address,
      number: number,
      ssn: ssn,
      owner: route.params.management._id,
      user_id: userData.id,
      room_number: roomNumber,
      username:userData.username,
      property: property,

    })

    setDisabled(false);
    setIsSubmitted(true);
  }

  const returnBack = () => {
    navigation.navigate("Home");
  }


  return (isSubmitted)?
  (
    <TouchableWithoutFeedback onPress={returnBack}>
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
      <Text style={{position:"absolute", top:"45%", fontSize:25, fontWeight:"500", color:"#FF3008"}}>
        Successfully Submitted!
      </Text>
      <Text style={{marginTop:20, color: "gray"}}>Click Anywhere to return to Home</Text>
    </View>
    </TouchableWithoutFeedback>
  ):
  (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container, { backgroundColor: "white" }}
      keyboardVerticalOffset={0}
    >
      <ScrollView style={{ backgroundColor: "white", paddingTop: 60 }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

        <Text style={{ marginLeft: 30, fontSize: 30, fontWeight: "400", width: "60%", alignSelf: "flex-start" }}>
          Application for
        </Text>
        <Text style={{ marginLeft: 30, fontSize: 30, fontWeight: "600", marginBottom: 50, width: "60%", alignSelf: "flex-start" }}>
          {route.params.management.name}.
        </Text>
        <TextInput onChangeText={setName} value={name} placeholder="Name" style={styles.textInput} />
        <TextInput onChangeText={setAddress} value={address} placeholder="Address" style={styles.textInput} />
        <TextInput onChangeText={setNumber} value={number} placeholder="Phone Number" style={styles.textInput} />
        <TextInput onChangeText={setRoomNumber} value={roomNumber} placeholder="Unit Number" style={styles.textInput} />

        <TextInput onChangeText={setSsn} value={ssn} placeholder="SSN" style={styles.textInput} />
        <Text style={{ alignSelf: "flex-start", marginLeft: "10%" }}>Property:</Text>
          <Picker
            selectedValue={property}
            style={{ width: "80%", height: 160 }}
            onValueChange={(itemValue, itemIndex) => setProperty(itemValue)}
          >
            {route.params.management.propertyList.map((item, key)=>{
          return (
            <Picker.Item label={item} value={item} key={item}/>
          )
        })}
          </Picker>




        <TouchableWithoutFeedback onPress={onSubmit} disabled={disabled}>
          <View style={{ marginTop: 30, marginBottom: 100, height: 40, width: "80%", backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
            <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
              Submit
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

    </KeyboardAvoidingView>

  );
}

export default Application;

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
    width: "80%",
    borderColor: "#FF3008",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 30
  },
  btnContainer: {
    marginTop: 12
  }
});




/*
<Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setProperty(itemValue)}
      >
        {propertyList.map((item, key)=>{
          return (
            <Picker.Item label={item} value={item}/>
          )
        })}
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>*/

      /*

        <Text style={{ alignSelf: "flex-start", marginLeft: 40, marginBottom: 10 }}>Card Number:</Text>
        <TextInput onChangeText={setCardNumber} secureTextEntry={true} value={cardNumber} placeholder="SSN" style={styles.textInput} />
        <TextInput onChangeText={setExp} value={exp} placeholder="SSN" style={styles.textInput} />
        <TextInput onChangeText={setCvv} secureTextEntry={true} value={cvv} placeholder="SSN" style={styles.textInput} />
*/