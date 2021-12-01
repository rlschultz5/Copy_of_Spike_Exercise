import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView, Image } from 'react-native';
//import propertyCell from './propertyCell';
//import PropertyCell from "./propertyCell";
import axios from "axios";
import API from "../../api";
import AsyncStorage from '@react-native-async-storage/async-storage';


const dummy = [{name: "Butler Plaza", image:"https://images.rentable.co/109/39908572/large.jpg", description: "A beautiful plaza located near the Capitol"},
{name: "College Station", image:"https://images1.apartments.com/i2/2l94zr0dsxpvzq6gEXKnt_Ujz0lizsVBjkk8mJJ-crA/117/college-station-madison-wi-building-photo.jpg?p=1",
description: "If you are looking for a great location, come tour us!"}]


const PropertyList = ({ navigation }) => {

  const [managements, setManagements] = useState([])
  const [isLoading, setLoading] = useState(true);
  useEffect(()=>{
    const getOwners = async () => {
      setLoading(true);
      try{
      const res = await axios.post(`http://${API}:8080/api/getUserByRole`, {role:"owner"});
      setManagements(res.data.data);
      setLoading(false);
      console.log(res.data.data)
      } catch (e) {
        console.log(e.message);
      }
    }
    getOwners();
  },[])



  console.log(navigation)
  return isLoading ? 
  (<View><Text>Loading</Text></View>)
  :(
    <ScrollView style={{backgroundColor:"white"}} contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
  }}>
      
      {managements.map((management, key) => {
        return <TouchableWithoutFeedback  key={key} onPress={() => { navigation.navigate("HomeStack", { screen: "Detail" , params: {management: management}}) }}>
          <View style={{marginTop:50, marginBottom:0}}>
          <View style={{
      justifyContent: 'center',
      alignItems: 'center'}} >
        
        <Image style={{width: "110%", height: 170,  borderRadius:15}}
        source={{uri:management.imageList[0]}}/>
        </View>
          <Text style={{marginTop:10, textAlign: 'left', fontSize: 25, fontWeight:"300"}}>
            {management.name}
          </Text>
          <Text style={{width: 300, fontSize: 15, fontWeight:"300"}}>
            {(management.description.length > 100)? `${management.description.substring(0,100)}...`: management.description}
          </Text>
            </View>
        
        </TouchableWithoutFeedback>
      })}
    </ScrollView>
  );
}

/*<ScrollView style={{flex:1}}>
{dummy.map((property)=> {
  <Text>{property}</Text>
})}
/*</ScrollView>*/
export default PropertyList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
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



