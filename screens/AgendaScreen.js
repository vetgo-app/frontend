import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import SignIn from "../screens/SignInScreen"
import SignUp from "../screens/SignUpScreen"

export default function AgendaScreen({ navigation }) {
  const [appointment, setAppointment] = useState([]);
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = useState(false);
  const user = useSelector((state) => state.user.value)

  // const handleClic = (id) => {
  //   fetch(
  //     `process.env.EXPO_PUBLIC_BACKEND_URL + /appointments/deleteRDV/:${id}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAppointment(data);
  //     });
  // };

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/appointments/myRdv/" + user.token
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setAppointment(data.data);
      });
  }, []);
  const appointmentList = appointment?.map((e) => {
    return (
      <View key={e._id} style={styles.card}>
        <View style={styles.first}>
          <FontAwesome name={"calendar"} size={30} color="white" />
          <TouchableOpacity
            onPress={() => {
              handleClic(e._id);
            }}
          >
            <FontAwesome name={"close"} size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{e.appointmentDate}</Text>
        <Text style={styles.date}>{e.type}</Text>
        <Text style={styles.date}>{e.reason}</Text>
        <Text style={styles.date}>{e.userName}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.pageTitle}>Mes rendez vous</Text>
      </View>
      <View style={styles.body}>
        {!user.token ? (
          <View style={styles.signInUpContainer}>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, color: 'black', }}>Pour consulter vos rendez-vous, veuillez vous connecter</Text>
            </View>
            <View style={styles.SignInUpButtons}>
              <TouchableOpacity onPress={() => setModalSignInVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>Se connecter</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalSignUpVisible(true)} style={styles.buttonStyle} ><Text style={{ fontWeight: 700, color: '#fff' }}>S'inscrire</Text></TouchableOpacity>
            </View>
            <Modal visible={modalSignInVisible} animationType="none">
              <SignIn setModalSignInVisible={setModalSignInVisible} modalSignInVisible={modalSignInVisible} navigation={navigation} />
            </Modal>
            <Modal visible={modalSignUpVisible} animationType="none">
              <SignUp setModalSignUpVisible={setModalSignUpVisible} modalSignUpVisible={modalSignUpVisible} navigation={navigation} />
            </Modal>
          </View>
        ) : (<ScrollView style={{width: '80%',}}>
          {appointmentList}
        </ScrollView>)
        }
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#C2E7F7",
  },

  header: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1472AE",
  },

  body: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  card: {
    marginTop: 20,
    borderWidth: 1,
    width: "100%",
    padding: 50,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  date: {
    color: "white",
  },

  signInUpContainer: {
    width: '70%',
    height: '20%',
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
