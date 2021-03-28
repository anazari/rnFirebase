import React from "react";
import { Text, StyleSheet, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//props contain navigation
//you can call props.navigation.navigate("Your-Screen") to navigate to another screen
export default function LandingScreen(props) {
  const Body = () => {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Landing Screen</Text>
        </View>
      </View>
    );
  };
  return <Body />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
