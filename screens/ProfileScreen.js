import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SignIn from "../screens/SignInScreen"
import SignUp from "../screens/SignUpScreen"
import { logout } from "../reducers/user";

export default function ProfilScreen({ navigation }) {

  const user = useSelector((state) => state.user.value)
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = useState(false);
  const [profilPicture, setProfilPicture] = useState(null);

  const dispatch = useDispatch();

  const handleDisconnectClick = () => {
    dispatch(logout())
  }

  return (

    <SafeAreaView style={styles.container}>
      <Modal visible={modalSignInVisible} animationType="none">
        <SignIn setModalSignInVisible={setModalSignInVisible} modalSignInVisible={modalSignInVisible} navigation={navigation} />
      </Modal>
      <Modal visible={modalSignUpVisible} animationType="none">
        <SignUp setModalSignUpVisible={setModalSignUpVisible} modalSignUpVisible={modalSignUpVisible} navigation={navigation} />
      </Modal>
      <View style={styles.header}>
        <Image source={require('../assets/vetgologo.png')} style={styles.logoImage} />
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', color: '#0D2C56' }}>Bienvenue !</Text>
        {user.token ?
          (
            <View style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: (user.photo ? 300 : 100)
            }}>
              {user.photo && <Image
                source={{ uri: user.photo }}
                style={{ height: 130, width: 130, borderRadius: 100, borderWidth: 3, boxSizing:'content-box', borderColor: '#1472AE'
 }}
              />}
              <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: '#1472AE', marginBottom: 30 }}>{user.firstname} {user.lastname}</Text>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => handleDisconnectClick()}>
                <Text style={{ fontWeight: 600, fontSize: 16, color: '#fff' }}>Se déconnecter</Text></TouchableOpacity>
            </View>)
          :
          (
            <View style={[styles.signInUpContainer, { height: 100 }]}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 700, color: 'black', }}>Connectez-vous !</Text>
              </View>
              <View style={styles.SignInUpButtons}>
                <TouchableOpacity onPress={() => setModalSignInVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>Se connecter</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setModalSignUpVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>S'inscrire</Text></TouchableOpacity>
              </View>
            </View>)}
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#C2E7F7",
  },

  header: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  body: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  logoImage: {
    width: 250,
    height: 70,
  },

  signInUpContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  SignInUpButtons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonStyle: {
    width: 150,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
});
