import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
export default function SignInScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    fetch("http://192.168.100.110:3000/users/signin", {
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
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              photo: data.photo,
            })
          );
          setEmail("");
          setPassword("");
        }
        if (route?.params?.origin === "HomeScreen") {
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSignUpClick = () => {
    console.log("redirection");
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Me connecter</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.signinInputs}>
          <Text
            style={{ fontWeight: 500, textAlign: "center", marginBottom: 20 }}
          >
            {" "}
            Veuillez entrer vos identifiants de connexion :
          </Text>
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
        <TouchableOpacity
          onPress={() => handleSignUpClick()}
          style={styles.signUpPage}
        >
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
    height: 350,
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },

  emailInput: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#1472AE",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },

  passwordInput: {
    width: "100%",
    height: 40,
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
