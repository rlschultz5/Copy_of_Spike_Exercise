import React, { useState } from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../api";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      
      const res = await axios.post(`http://${API}:8080/api/signin`, { username: username, password: password });
      setIsLoading(false);

      if (res.status != 200) {
        setAuthStatus("denied");
        setError(true);
        console.log("denied");
        return;
      }

      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data))
      } catch (e) {
        // saving error
      }

      navigation.navigate("NavStack", { screen: "HomeStack" });

    } catch (e) {
      console.log(e.message);
      setError(true);
      setIsLoading(false);
      setAuthStatus("denied");
      return;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>MadRentals</Text>
          <View>
            <TextInput placeholderTextColor="#ffc3b8" style ={styles.textInput}onChangeText={setUsername} value={username} placeholder="Username" style={styles.textInput} />
            <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={true} onChangeText={setPassword} value={password} placeholder="Password" style={styles.textInput} />
          </View>
          {(isError)?(<Text style={{color:"blue"}}>* Login Failed. The credentials do not match.</Text>):<Text/>}

          <View style={styles.btnContainer}>
            <Button color="white" title="Submit" disabled={isLoading} onPress={onSubmit} />
            <Button color="white" title="Don't have an account?" onPress={() => navigation.navigate('SignUp')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF3008"
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
    color:"white",
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

