import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export default function AgendaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.styleContainer}>
          <Text style={styles.title}>Mes rendez vous</Text>
          <Text style={styles.text}>Prochaines rendez-vous</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.first}>
            <FontAwesome name={"calendar"} size={30} color="white" />
          </View>
          <Text style={styles.date}>13/05/2025 / 11h00</Text>
          <Text style={styles.date}>Veterinaire</Text>
          <Text style={styles.date}>Pour Regex</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#1472AE",
  },
  card: {
    borderWidth: 1,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
});
