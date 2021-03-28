import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebase } from "./firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LandingScreen from "./screens/LandingScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home" || route.name === "Landing") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile" || route.name === "Login") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Registration") {
              iconName = focused ? "person-add" : "person-add-outline";
            }

            // You can return any icon component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#788eec",
          inactiveTintColor: "gray",
        }}
      >
        {userID ? (
          <>
            <Tab.Screen name="Home">
              {(props) => <HomeScreen {...props} userID={userID} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {(props) => <ProfileScreen {...props} userID={userID} />}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen name="Landing" component={LandingScreen} />
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
