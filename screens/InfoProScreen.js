import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function InfoProScreen({ navigation, route }) {
  const {
    storeId,
    firstname,
    lastname,
    address,
    occupation,
    price,
    selectedHour,
  } = route.params;

  // useEffect(() => {
  //   // use Effect permet d'afficher les elements a chaque re render
  //   fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${storeId}`)
  //     .then((response) => response.json())
  //     .then((data) => {});
  // }, []);

  // const fullAddress = address.map((e) => {
  // return (<Text key={e} style={styles.adresse}>{e.street}, {e.zipCode} {e.city}</Text>);
  // })

  return (
    <SafeAreaView style={styles.container}>
      {/* Flèche retour */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#1472AE" />
        </TouchableOpacity>
        <Text style={styles.title}>Fiche de profil</Text>
      </View>

      {/* Carte identité */}
      <View style={styles.body}>
        <View style={styles.coordonnees}>
          <Image
            style={styles.image}
            source={require("../assets/doctorPicture.jpg")}
          />
          <View style={styles.coordonneesText}>
            <Text style={styles.h2}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.text}>
              {occupation.charAt(0).toUpperCase() + String(occupation).slice(1)}
            </Text>
            <Text style={styles.text}>
              {address.street}, {address.zipCode} {address.city}
            </Text>
          </View>
        </View>

        {/* Photo enseigne */}
        <View>
          <Text style={styles.sectionTitle}>Photo de l'enseigne</Text>
          {/* <Image
        source={{ uri: photoClinique }}
        style={styles.cliniqueImage}
        resizeMode="cover"
      /> */}
          <Image
            source={require("../assets/cliniqueveterinaire.jpg")}
            style={styles.cliniqueImage}
            resizeMode="cover"
          />
        </View>
        {/* Informations */}
        <View style={{ width: "80%" }}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.titleBox}>Jours d'ouverture</Text>
              <Text style={styles.time}>{selectedHour}</Text>
            </View>
            <View>
              <Text style={styles.titleBox}>Prix de la consultation</Text>
              <Text style={styles.price}>{price} € </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate("TakeRdv", {
              firstname,
              lastname,
              occupation,
              address,
              price,
              selectedHour,

              // isSelectedUrgence,
              // isSelectedVisio,
              // isSelectedDom,
              // appointmentDate,
              // appointmentHour
            });
          }}
        >
          <Text style={styles.textNextButton}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  //Place du titre FIche de profil
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "10%",
    gap: 10,
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginLeft: 30,
  },

  //Fiche de profil
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1472AE",
    alignItems: "right",
    marginLeft: 10,
  },

  body: {
    height: "93%",
    width: "100%",

    justifyContent: "space-evenly",
    alignItems: "center",
  },

  //Encart Professionnel
  card: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },

  //Dimensions photo du professionnel
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  //Police de l'encart professionnel
  name: {
    color: "#FFFFFF",
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

  coordonnees: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D2C56",
    padding: 10,
    width: "90%",
    justifyContent: "space-around",
    borderRadius: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  coordonneesText: {
    justifyContent: "space-around",
    height: 80,
    width: 200,
  },

  h2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  text: {
    color: "white",
    fontSize: 14,
  },

  //Police et emplacement des titres Photos de l'enseigne + Informations
  sectionTitle: {
    fontWeight: "bold",
    color: "#1472AE",
    fontSize: 20,
    marginBottom: 10,
  },

  //Photo enseigne
  cliniqueImage: {
    width: 300,
    height: 160,
    borderRadius: 10,
    marginTop: 10,
  },

  //Encart des Informations
  infoBox: {
    backgroundColor: "#F2F9FF",
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },

  //Police des titres dans Informations
  titleBox: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
  },

  //Bouton suivant
  nextButton: {
    backgroundColor: "#0D2C56",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 65,
  },

  //Texte bouton suivant
  textNextButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
