import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from "axios";
import API from "../../api";


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [username, setUsername] = useState();
  const [isRenter, setIsRenter] = useState(true);
  const [password, setPassword] = useState();
  const [ssn, setSsn] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [exp, setExp] = useState();
  const [cvv, setCvv] = useState();
  const [property, setProperty] = useState();
  const [propertyList, setPropertyList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isError, setError] = useState(false);

  const goHome = () => {
    navigation.navigate("Login");
  }

  const onSubmit = async () => {

    if(name == null|| address == null || number == null || password == null || cardNumber ==null || exp == null ||cvv==null ||username==null) {
      setError(true);
      return;
    }

    if (!isRenter) {
      navigation.navigate('OwnerSignup', {
        info: {
          username: username,
          name: name,
          password: password,
          address: address,
          phone: number,
          card_number: cardNumber,
          expiry_date: exp,
          cvv: cvv,
          role: "renter"
        }
      });
      return;
    }
    try {
      setDisabled(true);
      const res = await axios.post(`http://${API}:8080/api/signup`,
        {
          username: username,
          name: name,
          password: password,
          address: address,
          phone: number,
          card_number: cardNumber,
          expiry_date: exp,
          cvv: cvv,
          role: "renter"
        });
      setIsLoading(false);


      if (res.status != 200) {
        setAuthStatus("denied");
        console.log("denied");
        return;
      }
      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data))
        console.log(res.data);
      } catch (e) {
        // saving error
      }

      setSubmitted(true);
    } catch (e) {
      console.log(e.message);
    }
    setDisabled(false);
  }


  return (submitted) ?
    (
      <TouchableWithoutFeedback onPress={goHome}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
          <Text style={{ position: "absolute", top: "45%", fontSize: 25, fontWeight: "500", color: "#FF3008" }}>
            Successfully Signed Up!
          </Text>
          <Text style={{ marginTop: 20, color: "gray" }}>Click Anywhere to Log in!</Text>
        </View>
      </TouchableWithoutFeedback>
    )
    : (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ marginTop: 40 }}>
            <View style={styles.inner}>
              <Text style={styles.header}>Become a Mad Renter</Text>
              <View>
                <Text style={styles.label}>General Info:</Text>

                <TextInput onChangeText={setName} value={name} placeholderTextColor="#ffc3b8" placeholder="Name" style={styles.textInput} />
                <TextInput onChangeText={setAddress} value={address} placeholderTextColor="#ffc3b8" placeholder="Address" style={styles.textInput} />
                <TextInput onChangeText={setNumber} value={number} placeholderTextColor="#ffc3b8" placeholder="Phone Number" style={styles.textInput} />
                <TextInput onChangeText={setUsername} value={username} placeholderTextColor="#ffc3b8" placeholder="Username (email)" style={styles.textInput} />
                <TextInput onChangeText={setPassword} value={password} placeholderTextColor="#ffc3b8" placeholder="Password" style={styles.textInput} />

                <Text style={styles.label}>Payment Info:</Text>


                <TextInput onChangeText={setCardNumber} value={cardNumber} placeholderTextColor="#ffc3b8" placeholder="Credit Card Number" style={styles.textInput} />
                <TextInput onChangeText={setExp} value={exp} placeholderTextColor="#ffc3b8" placeholder="Mo / Yr" style={styles.textInput} />
                <TextInput onChangeText={setCvv} value={cvv} placeholderTextColor="#ffc3b8" placeholder="CVV" style={styles.textInput} />
              </View>

              <View style={styles.checkboxContainer}>

                <Text style={styles.label}>Are you a renter? (Uncheck if owner)</Text>
                <Checkbox
                  color="white"
                  status={isRenter ? 'checked' : 'unchecked'}
                  onPress={() => { setIsRenter(!isRenter) }}
                  style={styles.checkbox}
                />
              </View>

              {(isError)?(<Text style={{color:"blue"}}>* Sign up Failed. Please fill in all the blanks.</Text>):<Text/>}


              <View style={styles.btnContainer}>
                <Button color="white" disabled={disabled} title="Create" onPress={onSubmit} />
                <Button color="white" title="Already have an account?" onPress={() => navigation.navigate("Login")} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF3008"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    marginLeft: 100,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 4,
    width: 10,
    height: 10
  },
  label: {
    marginTop: 8,
    color: "white",
    fontWeight: "600"
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "300",
    marginBottom: 48,
    color: "white",
  },
  textInput: {
    height: 40,
    color: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});



