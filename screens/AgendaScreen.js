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

  const handleClic = (id) => {
    console.log("test2");
    fetch(
      `process.env.EXPO_PUBLIC_BACKEND_URL + /appointments/deleteRDV/:${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("test3");
        setAppointment(data);
        console.log("test");
      });
  };

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/appointments")
      .then((response) => response.json())
      .then((data) => {
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
              console.log("clic");
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
