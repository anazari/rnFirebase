import React from "react";
import { Text, View, StyleSheet } from "react-native";

//template code does not call firebase backend on the home screen
//you probably want to pull some data from your backend on a real project
import { firebase } from "../firebaseConfig";

//the userID is passed in as a prop
export default function HomeScreen(props) {
  const userID = props.userID;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Home Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
