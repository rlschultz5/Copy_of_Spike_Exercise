import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView  } from 'react-native';

export default propertyCell = ({ navigation, property}) => {
    return (
        <View style ={{flex:1}}>
            <Text >
           {property}
            </Text>
        </View>
      );
}