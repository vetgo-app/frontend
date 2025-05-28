import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { CameraView, Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { login } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpScreen({ navigation, route, setModalSignUpVisible, modalSignUpVisible, formData }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [facing, setFacing] = useState("front");
  const [profilPicture, setProfilPicture] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return <View />;
  }

  const uploadPicture = (photo) => {
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
  };

  const handleSignUp = () => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        role: "Particulier",
        photo: profilPicture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(login({ firstname, lastname, email, photo: profilPicture }));
          console.log(data);
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setProfilPicture(null);
          if (modalSignUpVisible) {
            setModalSignUpVisible(false)
            navigation.navigate("RdvConfirmation", formData)
          }
        }
      });
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 }); // Javascript
    photo && uploadPicture(photo);
    console.log(photo);
    setModalVisible(false);
    setProfilPicture(photo.uri);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  };

  const handlePressProfilPhoto = (e) => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="none" transparent>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={(ref) => (cameraRef.current = ref)}
        >
          {/* Top container with the setting buttons */}
          <SafeAreaView style={styles.settingContainer}>
            <TouchableOpacity
              style={styles.settingButton}
              onPress={toggleCameraFacing}
            >
              <FontAwesome name="rotate-right" size={25} color="white" />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Bottom container with the snap button */}
          <View style={styles.snapContainer}>
            <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
              <FontAwesome name="circle-thin" size={95} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>

      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>S'inscrire</Text>
      </View>
      <View
        style={styles.bodyContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={styles.signUpInputs}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            height: 50,
            flexDirection: "row",
            marginBottom: 30
          }}>
            <TouchableOpacity onPress={() => handlePressProfilPhoto()}>
              <Image
                source={
                  profilPicture
                    ? { uri: profilPicture }
                    : require("../assets/add-profile-picture.jpg")
                }
                style={{ height: 70, width: 70, borderRadius: 100 }}
                height={profilPicture ? 70 : 140}
                width={profilPicture ? 70 : 140}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.firstnameInput}
              placeholder="Marine"
              onChangeText={(value) => setFirstname(value)}
              value={firstname}
            />
          </View>
          <TextInput
            textContentType="name"
            style={styles.lastnameInput}
            placeholder="Durand"
            onChangeText={(value) => setLastname(value)}
            value={lastname}
          />
          <TextInput
            textContentType="emailAddress"
            autoCapitalize="none"
            style={styles.emailInput}
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.passwordInput}
            placeholder="mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => handleSignUp()}>
            <Text style={{ color: "#ffff", fontSize: 16 }}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        {
          modalSignUpVisible ? (
            <>
              <TouchableOpacity onPress={() => setModalSignUpVisible(false)}><Text style={{ fontWeight: 'bold' }}>Fermer</Text></TouchableOpacity>
            </>
          ) : (<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ fontSize: 16, color: "#1472AE" }}>
              Vous avez déjà un compte ?
              <Text style={{ fontWeight: "bold" }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>)
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

  signUpInputs: {
    alignItems: "center",
    width: "100%",
    height: 350,
  },

  firstnameInput: {
    width: "40%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
    marginRight: 38,
    borderRadius: 10,
    paddingLeft: 10,
  },

  lastnameInput: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },

  emailInput: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },

  passwordInput: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1472AE",
    marginBottom: 40,
    borderRadius: 10,
    paddingLeft: 10,
  },

  signUpButton: {
    backgroundColor: "#1472AE",
    width: "60%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    flex: 1,
    justifyContent: "space-between",
  },

  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  settingButton: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  snapContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  snapButton: {
    width: 100,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
