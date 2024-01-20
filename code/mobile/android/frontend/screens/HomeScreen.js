import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, StatusBar, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
    const navigation = useNavigation();

    return (
      <SafeAreaView style={tw`bg-green-100 h-full`}>
        <View style={[tw`bg-red-100`,{marginTop: StatusBar.currentHeight}]}>
          <Text> Hello Home Screen</Text>
          
        </View>
      </SafeAreaView> 
    );
}

const styles = StyleSheet.create({});
