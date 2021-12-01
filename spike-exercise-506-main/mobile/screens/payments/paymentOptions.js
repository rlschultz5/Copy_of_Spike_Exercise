import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentOptions = ({ navigation }) => {
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function getRole() {
        try {
          let data = JSON.parse(await AsyncStorage.getItem('user'));
          setRole(data.role);
          console.log(data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      getRole()
    }, [])

    if(loading) return <View><Text>Loading...</Text></View>
    return (role=="renter")?(
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.inner}>
              
          
              <View style={styles.btnContainer}>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Button title="Make A Payment" onPress={() => navigation.navigate('Make A Payment')} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ):(
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.inner}>
        
            <View style={styles.btnContainer}>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Button title="Charge Late Fee or Penalty" onPress={() => navigation.navigate('Charge')} />

              <Text></Text>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)
}

export default PaymentOptions;

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


