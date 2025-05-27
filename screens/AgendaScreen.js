import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function AgendaScreen() {
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/appointments")
      .then((response) => response.json())
      .then((data) => {
        setAppointment(data.data);
        console.log("test1", data.data);
      });
  }, []);
  const appointmentList = appointment?.map((e) => {
    return (
      <View key={e._id} style={styles.card}>
        <View style={styles.first}>
          <FontAwesome name={"calendar"} size={30} color="white" />
          <TouchableOpacity
            onPress={() => {
              console.log("clic");
            }}
          >
            <FontAwesome name={"close"} size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{e.appointmentDate}</Text>
        <Text style={styles.date}></Text>
        <Text style={styles.date}></Text>
      </View>
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.styleContainer}>
          <Text style={styles.title}>Mes rendez vous</Text>
          <Text style={styles.text}>Prochaines rendez-vous</Text>
        </View>
        {appointmentList}
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
});
