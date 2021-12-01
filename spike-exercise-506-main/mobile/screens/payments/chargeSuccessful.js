import React from 'react';
import { View, KeyboardAvoidingView, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';

const ChargeSuccessful = ({ navigation }) => {
    return (<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.inner}>
          
              <View style={styles.btnContainer}>
                  <Text>Charge Processed Successfully</Text>
                <Button title="Logout" onPress={() => navigation.navigate("Login")} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ChargeSuccessful;

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
    marginHorizontal: 20,
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


