import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RechercherListeScreen() {
  const [store, setStore] = useState([]);
  useEffect(() => {
    // use Effect permet d'afficher les elements a chaque re render
    fetch("http://192.168.100.47:3000/store")
      .then((response) => response.json())
      .then((data) => {
        setStore(data.data);
        console.log(data);
      });
  }, []);

  //le '?' permet d'attendre des données asynchrone (venant du fetch)
  const card = store.map((e, i) => (
    <View key={e._id} style={styles.card}>
      <View style={styles.coordonnees}>
        <View>
          <Image
            style={styles.image}
            source={require("../assets/doctorPicture.jpg")}
          />
        </View>

        <View style={styles.coordonneesText}>
          <Text style={styles.h2}>
            {e.user.firstname}
            {e.user.lastname}
          </Text>
          <Text style={styles.text}>{e.occupation}</Text>
          <Text style={styles.text}>{e.address.street}</Text>
          <Text style={styles.text}>{e.address.city}</Text>
        </View>
      </View>
      <View style={styles.dispo}>
        <Text>Prochaine disponibilité :</Text>
        <Text style={styles.span}>mardi 6 mai</Text>
      </View>
      <View style={styles.date}></View>
      <View style={styles.dispoLink}>
        <Text style={styles.dispoLinkText}>Voir plus de disponiblité</Text>
      </View>
    </View>
  ));

  // console.log(card?.length);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView>
          <View style={styles.styleContainer}>
            <View style={styles.filtre}>
              <Text style={styles.filtreText}>Au + tôt</Text>
              <Text style={styles.filtreText}>A domicile</Text>
              <Text style={styles.filtreText}>Visio</Text>
            </View>
            <View style={styles.searchMap}>
              <Text style={styles.map}>Voir sur la carte</Text>
              <FontAwesome name="map-marker" size={30} color="#1472AE" />
            </View>
            {card}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  styleContainer: {
    alignItems: "center",
  },

  filtre: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  filtreText: {
    color: "#1472AE",
    fontSize: 16,
    fontWeight: "bold",
  },

  searchMap: {
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
  },

  map: {
    fontSize: 20,
    margin: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: "#1472AE",
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  coordonnees: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0D2C56",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  image: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 250,
  },

  h2: {
    fontSize: 20,
    color: "white",
  },

  coordonneesText: {
    alignItems: "center",
  },

  text: {
    color: "white",
  },

  dispo: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#1472AE",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  span: {
    fontWeight: "bold",
  },

  date: {
    // gestion des mini card pour les jours et heures
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#1472AE",
    padding: 10,
    gap: 10,
    flexWrap: "wrap",
  },

  tabHeure: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderWidth: 2,
  },

  dispoLink: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  dispoLinkText: {
    color: "#1472AE",
  },
});
