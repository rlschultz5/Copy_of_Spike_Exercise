import React from 'react';
import { View, KeyboardAvoidingView, Image, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';

const RentalOwnerDetailScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30, fontWeight: "500" }}>
          {route.params.management.name}
        </Text>

        <View style={{ flex: 1, marginTop: 30, justifyContent: 'space-between', alignItems: "center", marginBottom:25 }}>
          <Image style={{ width: "90%", height: 300, borderRadius: 15, marginBottom: 30 }}
            source={{ uri: route.params.management.imageList[0] }} />
          <Text style={{ width: "90%" }}>
            {route.params.management.description}
          </Text>
          <Text style={{ width: "90%", marginTop: 30, color: "gray" }}>
            {`Phone number: ${route.params.management.phone}`}
          </Text>
          <Text style={{ width: "90%", color: "gray" }}>
            {`Email: ${route.params.management.username}`}
          </Text>

          <Text style={{ width: "90%", marginTop: 20, fontWeight: "500" }}>
            {`List of Properties:`}
          </Text>
          {(route.params.management.propertyList.map((item, key) => {
            return <Text style={{width:"90%", color:"gray"}} key={item}>{item}</Text>
          }))}
        </View>

        <TouchableWithoutFeedback onPress={() => navigation.navigate("Application", { management: route.params.management })}>
          <View style={{ position: "relative", height: 40, width: "80%", left: "10%", backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
            <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
              Submit Application
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView >

    </View>
  );
}
/*<View style={{ position: 'absolute', height: 40, width: "80%", left: "10%", bottom: 25, backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
          <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
            Submit Application
          </Text>
        </View>*/
export default RentalOwnerDetailScreen;

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
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});



