import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../firebaseConfig";
import { Button } from "react-native-paper";

export default function ProfileScreen(props) {
  const signOutUserAsync = async () => {
    try {
      await firebase.auth().signOut();
      location.reload();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>User Profile Screen</Text>
      </View>
      <Button
        labelStyle={styles.buttonTextStyle}
        mode="outlined"
        onPress={signOutUserAsync}
      >
        Sign Out
      </Button>
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
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#788eec",
  },
});
