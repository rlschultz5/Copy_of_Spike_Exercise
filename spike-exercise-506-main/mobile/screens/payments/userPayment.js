import React, { useState, useEffect} from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../api";

const UserPayment = ({ navigation }) => {
  const [payAmount, setPayAmount] = useState(null);
  const [userid, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [balance, setBalance] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const getBalance =async() =>{
      let id = JSON.parse(await AsyncStorage.getItem('user')).id;
      const res = await axios.post(`http://${API}:8080/api/renter/getBalance`, { user_id: id});
      console.log(res.data);
      setBalance(res.data["balanceObj"].currentBalanceDue);
      setNote(res.data["balanceObj"].note);
      setLoading(false);
    }
    getBalance();
  },[])


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      let id = JSON.parse(await AsyncStorage.getItem('user')).id;
      console.log(id);
      console.log(payAmount);

      const res = await axios.post(`http://${API}:8080/api/renter/submitpayment`, { user_id: id, paymentAmount: payAmount });
      setIsLoading(false);
     
      navigation.navigate("PaymentStack", { screen: "Payment Accepted" });

    } catch (e) {
      console.log(e.message);
      navigation.navigate("PaymentStack", { screen: "Payment Denied" });
      setIsLoading(false);
      return;
    }

  }
  if(isLoading==true) return <Text>Loading</Text>
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
                  </View>
                  <View style={styles.btnContainer}>
                  <Text style={{fontWeight:"500", fontSize: 20}}>{`Balance Due: $${balance}`} </Text>

                    <TextInput placeholderTextColor="gray" style ={styles.textInput}onChangeText={setPayAmount} value={payAmount} placeholder="PayAmount" style={styles.textInput} />
                    <Text style={{fontWeight:"600", fontSize: 20}}>
                      {`Note from Management:`}
                    </Text>
                    <Text>
                      {note}
                      </Text>

                    <Button title="Submit" onPress={onSubmit} />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
}

export default UserPayment;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"white"
    },
    inner: {
      marginTop:"40%",
      padding: 24,
      flex: 1,
      justifyContent: "space-around",
    },
    header: {
      fontSize: 36,
      fontWeight:"600",
      marginBottom: 48
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


