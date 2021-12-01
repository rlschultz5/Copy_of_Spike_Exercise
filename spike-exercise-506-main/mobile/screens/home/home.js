import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import PropertyDetail from './propertyDetail';
import PropertyList from "./propertyList"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation }) => {
  const [currentAddress, setCurrentAddress] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(()=>{
    const getAddress = async() => {
      setCurrentAddress(JSON.parse(await AsyncStorage.getItem('user')).address);
    }
    getAddress();
    setLoading(false);
  },[])
    return (isLoading)?(<Text>Loading...</Text>):(
        <View style={{flex: 1, backgroundColor:"white"}}>
            <Text style={{marginTop: 50, marginLeft: 20, fontSize:30, fontWeight:"500", width: "60%", alignSelf:"flex-start"}}> MadRentals.</Text>
            <Text style={{marginLeft: 27, fontSize:12, color:"#FF3008"}}>Click to start renting Mad!</Text>
            <Text style={{marginLeft: 27, fontWeight:"500", marginBottom:10}}>{`Current Address: ${currentAddress}`}
        </Text>
            <PropertyList navigation={navigation}/>
        </View>
      );
}

export default Home;

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
      fontWeight:"600",
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

  
  
