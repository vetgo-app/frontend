import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function InfoProScreen({ navigation, route }) {

  const { storeId, firstname, lastname, address, occupation, price, time } = route.params;

  useEffect(() => {
    // use Effect permet d'afficher les elements a chaque re render
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${storeId}`)
      .then((response) => response.json())
      .then((data) => { });
  }, []);

  // const fullAddress = address.map((e) => {
  // return (<Text key={e} style={styles.adresse}>{e.street}, {e.zipCode} {e.city}</Text>);
  // })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Flèche retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backArrow}
      >
        <FontAwesome name="chevron-left" size={20} color="#0D2C56" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Fiche de profil</Text>

      {/* Carte identité */}
      <View style={styles.card}>
        <Image source={{ uri: "test" }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{firstname} {lastname}</Text>
          <Text style={styles.specialite}>{occupation}</Text>
          <Text style={styles.adresse}>{address.street}, {address.zipCode} {address.city}</Text>
        </View>
      </View>

      {/* Photo enseigne */}
      <Text style={styles.sectionTitle}>Photos de l’enseigne</Text>
      {/* <Image
        source={{ uri: photoClinique }}
        style={styles.cliniqueImage}
        resizeMode="cover"
      /> */}

      {/* Informations */}
      <Text style={styles.sectionTitle}>Informations</Text>
      <View style={styles.infoBox}>
        {[
          "Jours d’ouverture",
          "Prix de la consultation",
          "Spécialisation",
          "Options",
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.infoRow}>
            <Text style={styles.infoText}>{item}</Text>
            <FontAwesome name="chevron-down" size={16} color="#0D2C56" />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TakeRdv", {
            firstname,
            lastname,
            occupation,
            address,
            price,
            time,
          });
        }}
        style={styles.nextButton}
      >
        <Text>Suivant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  backArrow: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D2C56",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#0D2C56",
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  specialite: {
    color: "white",
    marginTop: 2,
  },
  adresse: {
    color: "white",
    marginTop: 2,
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#0D2C56",
    fontSize: 16,
    marginBottom: 10,
  },
  cliniqueImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: "#F2F9FF",
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    color: "#0D2C56",
    fontWeight: "bold",
  },
  nextButton: {
    borderWidth: 1,
    width: "60%",
    alignItems: "center",
  },
});
