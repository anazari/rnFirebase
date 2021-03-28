import React, { useState } from "react";
import { Text, TextInput, View, SafeAreaView, StyleSheet } from "react-native";
import { firebase } from "../firebaseConfig";
import { Button } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPressAsync = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      try {
        //users collection stores the email, uid, and username of the user
        const firestoreDocument = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();
        if (!firestoreDocument.exists) {
          alert("User does not exist anymore.");
          return;
        }
        const user = firestoreDocument.data();
        navigation.navigate("Home", { userID: user.id }, navigation);
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          mode="contained"
          onPress={() => onLoginPressAsync()}
        >
          Login
        </Button>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextStyle: {
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#788eec",
    marginHorizontal: 30,
    marginTop: 10,
    height: 48,
    justifyContent: "center",
  },
});
