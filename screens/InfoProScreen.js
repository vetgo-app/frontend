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
  const { storeId, firstname, lastname, address, occupation, price, time } =
    route.params;

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Flèche retour */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#1472AE" />
        </TouchableOpacity>
        <Text style={styles.title}>Fiche de profil</Text>
      </View>

      {/* Carte identité */}
      <View style={styles.card}>
        <Image style={styles.profileImage}
          source={require("../assets/doctorPicture.jpg")}
        />
        <View>
          <Text style={styles.name}>
            {firstname} {lastname}
          </Text>
          <Text style={styles.specialite}>{occupation}</Text>
          <Text style={styles.adresse}>
            {address.street}, {address.zipCode} {address.city}
          </Text>
        </View>
      </View>


      {/* Photo enseigne */}
      <Text style={styles.sectionTitle}>Photos de l'enseigne</Text>
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

      {/* Informations */}
      <Text style={styles.sectionTitle}>Informations</Text>
      <View style={styles.infoBox}>
        <View>
          <Text style={styles.titleBox}>Jours d'ouverture</Text>
          <Text style={styles.time}>{time} h </Text>
        </View>
        <View>
          <Text style={styles.titleBox}>Prix de la consultation</Text>
          <Text style={styles.price}>{price} € </Text>

        </View>
        {/* <View>
          <Text style={styles.titleBox}>Spécialisation</Text>
          <Text style={styles.specialization}>{specialization} </Text>
        </View> */}

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
            time,

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
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  //Place du titre FIche de profil
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },

  //Fiche de profil
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1472AE",
    alignItems: "right",

  },

  //Encart Professionnel
  card: {
    backgroundColor: "#0D2C56",
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

  //Police et emplacement des titres Photos de l'enseigne + Informations
  sectionTitle: {
    fontWeight: "bold",
    color: "#1472AE",
    fontSize: 20,
    marginBottom: 10,

  },

  //Photo enseigne
  cliniqueImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 25,
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
