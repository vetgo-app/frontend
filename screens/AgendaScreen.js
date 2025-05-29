import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function AgendaScreen() {
  const user = useSelector((state) => state.user.value);
  const [appointment, setAppointment] = useState([]);
  //console.log(appointment);

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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Mes rendez vous</Text>
          <Text style={styles.text}>Prochaines rendez-vous</Text>
          {appointmentList}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },

  title: {
    marginTop: 50,
    fontSize: 26,
    fontWeight: "bold",
    color: "#1472AE",
  },
  card: {
    marginTop: 20,
    borderWidth: 1,
    width: "80%",
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
});
