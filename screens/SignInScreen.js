import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignInScreen({ navigation, route, setModalSignInVisible, modalSignInVisible, formData }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(navigation, route);

  const handleSignIn = () => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          console.log(data);

          dispatch(
            login({ ...data })
          );
          console.log('redux login', ...data, data)
          setEmail("");
          setPassword("");
          if (modalSignInVisible) {
            console.log('je suis entré')
            if (route?.params?.origin === "TakeRdv") {
              navigation.navigate("RdvConfirmation");
            } else {
              setModalSignInVisible(false)
            }
          }
        }
      })
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome name='paw' size='30' color='#1472AE' solid></FontAwesome>
        <Text style={styles.pageTitle}>Se connecter</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.signinInputs}>
          <Text
            style={{ fontSize: 16, fontWeight: 500, textAlign: "center", marginBottom: 30 }}
          >
            Veuillez entrer vos identifiants de connexion :
          </Text>
          <TextInput
            style={styles.emailInput}
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="password"
            autoCapitalize="none"
            autoComplete="password"
            secureTextEntry={true}
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
        {
          modalSignInVisible ? (
            <>
              <TouchableOpacity onPress={() => setModalSignInVisible(false)}><Text style={{ fontWeight: 'bold' }}>Fermer</Text></TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signUpPage}
              >
                <Text style={{ width: "100%", fontSize: 16, color: "#1472AE" }}>
                  Vous n'avez pas de compte ?{" "}
                  <Text style={{ fontWeight: "bold" }}>S'inscrire</Text>
                </Text>
              </TouchableOpacity>
            </>
          )
        }
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
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  signinInputs: {
    width: "60%",
    height: 250,
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },

  emailInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },

  passwordInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
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
