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
      <View style={styles.welcomingContainer}>
        <View>
          <Image source={require('../assets/vetgologo.png')} style={styles.logoImage} />
        </View>
        <Text style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', color: '#0D2C56' }}>Bienvenue sur VetGo</Text>
        {user.token ?
          (
            <View style={styles.signInUpContainer}>
              <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: '#1472AE', marginBottom: 30 }}>{user.firstname} {user.lastname}</Text>
              <TouchableOpacity style={styles.buttonStyle}><Text style={{ fontWeight: 700, color: '#fff' }}>Se déconnecter</Text></TouchableOpacity>
            </View>)
          :
          (
            <View style={styles.signInUpContainer}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 700, color: '#1472AE', }}>Veuillez vous connecter :</Text>
              </View>
              <View style={styles.SignInUpButtons}>
                <TouchableOpacity onPress={() => setModalSignInVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>Se connecter</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setModalSignUpVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>S'inscrire</Text></TouchableOpacity>
              </View>
            </View>)}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#C2E7F7",
  },

  logoImage: {
    width: 250,
    height: 70,
  },

  welcomingContainer: {
    width: '80%',
    height: '66%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  signInUpContainer: {
    width: '90%',
    height: 90,

    alignItems: 'center',
    justifyContent: 'space-between',
  },

  SignInUpButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonStyle: {
    width: 130,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
});
