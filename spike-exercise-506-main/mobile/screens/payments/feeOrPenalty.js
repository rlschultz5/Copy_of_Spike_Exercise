import React, { useState, useEffect} from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../api";

const FeeOrPenalty = ({route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [renterID, setRenterID] = useState(null);
  const [feeAmount, setFeeAmount] = useState(null);
  const [penaltyAmount, setPenaltyAmount] = useState(null);
  const [note, setNote] = useState();

  useEffect(()=>{
    if(route.params) setRenterID(route.params.application.renter);
  })


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://${API}:8080/api/owner/chargePayment`, { renter_id: renterID, chargeAmount: (parseInt(feeAmount) + parseInt(penaltyAmount)) , note:note});
      setIsLoading(false);

      navigation.navigate("PaymentStack", { screen: "Charged Account Successfully" });

    } catch (e) {
      console.log(e.message);
      navigation.navigate("PaymentStack", { screen: "Charged Unsuccessful" });
      setIsLoading(false);
      return;
    }

  }
  
    return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.inner}>
                  <View>
                  <TextInput placeholderTextColor="gray" style ={styles.textInput}onChangeText={setRenterID} value={renterID} placeholder="Renter's ID" style={styles.textInput} />
                  <TextInput placeholderTextColor="gray" style ={styles.textInput}onChangeText={setFeeAmount} value={feeAmount} placeholder="Rent" style={styles.textInput} />
                  <Text></Text>
                  <Text></Text>
                  <TextInput placeholderTextColor="gray" style ={styles.textInput}onChangeText={setPenaltyAmount} value={penaltyAmount} placeholder="Late Fee and Penalty" style={styles.textInput} />
                  <TextInput placeholderTextColor="gray" style ={styles.textInput}onChangeText={setNote} value={note} placeholder="Note" style={styles.textInput} />

                  </View>
              
                  <View style={styles.btnContainer}>
                    <Button title="Submit" onPress={onSubmit} />
                    <Button title="Logout" onPress={() => navigation.navigate("Login")} />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
}

export default FeeOrPenalty;

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
  scrollView: {
    backgroundColor: 'white',
    padding: 20,
  },
  textInput: {
    height: 40,
    width: "80%",
    borderColor: "#FF3008",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 30,
    marginTop:20
  },
  btnContainer: {
    marginTop: 12
  }
});


