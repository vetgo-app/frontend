import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";

export default function RechercherListeScreen() {
  const [store, setStore] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.81:3000/store")
      .then((response) => response.json())
      .then((data) => {
        setStore(data);
      });
  }, []);

  const date = ["heure1", "heure2", "heure3", "heure1", "heure2"];
  const aff = date.map((e, i) => (
    <View key={i} style={styles.tabHeure}>
      <Text>{e}</Text>
    </View>
  ));
  return (
    <ScrollView style={styles.container}>
      <View style={styles.styleContainer}>
        <View style={styles.filtre}>
          <View>{card}</View>
          <Text style={styles.filtreText}>Au + tôt</Text>
          <Text style={styles.filtreText}>A domicile</Text>
          <Text style={styles.filtreText}>Visio</Text>
        </View>
        <View style={styles.searchMap}>
          <Text style={styles.map}>Voir sur la carte</Text>
          <FontAwesome name="map-marker" size={30} color="#1472AE" />
        </View>
        <View style={styles.card}>
          <View style={styles.coordonnees}>
            <Image
              style={styles.image}
              source={require("../assets/favicon.png")}
            />
            <View style={styles.coordonneesText}>
              <Text style={styles.h2}>$Nom $Prenom</Text>
              <Text style={styles.text}>$ Profession</Text>
              <Text style={styles.text}>$ Adresse</Text>
              <Text style={styles.text}>$ city</Text>
            </View>
          </View>
          <View style={styles.dispo}>
            <Text>Prochaine disponibilité :</Text>
            <Text style={styles.span}>$ mardi 6 mai</Text>
          </View>
          <View style={styles.date}>
            {/* affichage du tableau pour les heures de rdv, info dispo dans le tableau date , a supprimer apres fetch bdd */}
            {aff}
          </View>
          <View style={styles.dispoLink}>
            <Text style={styles.dispoLinkText}>Voir plus de disponiblité</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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

  styleContainer: {
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#1472AE",
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
  },

  coordonnees: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0D2C56",
    width: "100%",
    height: "40%",
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
    height: "10%",
    alignItems: "center",
  },

  span: {
    fontWeight: "bold",
  },

  date: {
    // gestion des mini card pour les jours et heures
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
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
    padding: 5,
  },

  dispoLink: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },

  dispoLinkText: {
    color: "#1472AE",
  },
});
