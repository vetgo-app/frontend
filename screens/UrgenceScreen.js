import { ScrollView, StyleSheet, Text, View, Image, Span } from "react-native";
import React from "react";

export default function UrgenceScreen() {
  const date = ["heure1", "heure2", "heure3"];
  const aff = date.map((e, i) => (
    <View key={i} style={styles.tabHeure}>
      <Text>{e}</Text>
    </View>
  ));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.styleContainer}>
        <View>
          <Text style={styles.title}>Urgences</Text>
        </View>
        <View>
          <Text style={styles.map}>Voir sur la carte</Text>
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
            <Text>{aff}</Text>
          </View>
          <View style={styles.dispo}>
            <Text>Voir plus de disponiblité</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "red",
  },

  map: {
    fontSize: 20,
    margin: 10,
  },

  styleContainer: {
    alignItems: "center",
  },
  card: {
    borderWidth: 2,
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
    borderBottomWidth: 2,
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
    backgroundColor: "f0f0f0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#1472AE",
  },

  tabHeure: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 2,
  },
});
