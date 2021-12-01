import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from "axios";
import API from "../../api";


const OwnerScreen = ({route, navigation }) => {
  const [imageList, setImageList] = useState();
  const [propertyList, setPropertyList] = useState();
  const [description, setDescription] = useState();
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const goHome = () => {
    navigation.navigate("Login");
  }

  const onSubmit = async () => {
    try {
      setDisabled(true);
      const res = await axios.post(`http://${API}:8080/api/signup`,
        {
          username: route.params.info.username,
          name: route.params.info.name,
          password: route.params.info.password,
          address: route.params.info.address,
          phone: route.params.info.phone,
          card_number: route.params.info.cardNumber,
          expiry_date: route.params.info.exp,
          cvv: route.params.info.cvv,
          description: description,
          imageList: imageList.split(','),
          propertyList: propertyList.split(','),
          role: "owner"
        });
      

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
          <Text style={{ marginTop: 20, color: "gray" }}>Click Anywhere to Log In!</Text>
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
              <Text style={styles.header}>Become a Mad Owner</Text>
              <View>
                <Text style={styles.label}>Display Info:</Text>

                <TextInput onChangeText={setDescription} value={description} placeholderTextColor="#ffc3b8" placeholder="Description" style={styles.textInput} />
                

                <Text style={styles.label}>Image URL:</Text>

                <Text style={{color:"#ffc3b8",}}>(If multiple, please seperate with commas with no space)</Text>
                <Text style={{color:"#ffc3b8",}}>Ex: Red Hat,Apple,Hot Pie</Text>
                <TextInput onChangeText={setImageList} value={imageList} placeholderTextColor="#ffc3b8" style={styles.textInput} />

                <Text style={styles.label}>Property Address:</Text>

                <Text style={{color:"#ffc3b8",}}>(If multiple, please seperate with commas with no space)</Text>
                <Text style={{color:"#ffc3b8",}}>Ex: Red Hat,Apple,Hot Pie</Text>

                <TextInput onChangeText={setPropertyList} value={propertyList} placeholderTextColor="#ffc3b8" style={styles.textInput} />
              </View>

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

export default OwnerScreen;

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



