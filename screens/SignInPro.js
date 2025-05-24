import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function SignInPro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = () => {
    fetch("http://192.168.1.81:3000/users/signInPro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(
            login({
              _id: data._id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              photo: data.photo,
            })
          );
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Se connecter</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.signinInputs}>
          <TextInput
            style={styles.emailInput}
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="password"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              backgroundColor: "#1472AE",
              width: "100%",
              height: 50,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#ffff", fontSize: 16 }}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpPage}>
          <Text style={{ width: "100%", fontSize: 16, color: "#1472AE" }}>
            Vous n'avez pas de compte ?{" "}
            <Text style={{ fontWeight: "bold" }}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    height: "13%",
    backgroundColor: "#ffff",
    borderBottomWidth: 1,
    borderBottomColor: "#1472AE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageTitle: {
    fontWeight: 800,
    fontSize: 26,
    color: "#1472AE",
    textAlign: "center",
    width: "100%",
  },

  bodyContainer: {
    height: "87%",
    width: "80%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  signinInputs: {
    width: "80%",
    height: 200,
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },

  emailInput: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#1472AE",
    borderRadius: 10,
    paddingLeft: 10,
  },

  passwordInput: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#1472AE",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 40,
  },

  signUpButtonsignUpButton: {
    backgroundColor: "#1472AE",
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
