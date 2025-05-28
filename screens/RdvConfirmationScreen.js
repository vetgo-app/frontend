import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // ou react-native-vector-icons

export default function RdvConfirmationScreen({ navigation, route }) {
  const [confirmed, setConfirmed] = useState(false);
  const appointment = route.params;
  console.log("test4", appointment);

  const onClick = () => {
    setConfirmed(true);
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/appointments/addAppointment",
      {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          user: appointment?._id, // pour generer la relation de user avec store
          store: appointment?.address,
          pet: appointment.isMyAnimal,
          date: appointment?.time,
          price: appointment?.price,
          reason: appointment?.selectedReason,
          firstRdv: appointment?.isFirstRdv,
        }),
      }
    ).then((res) => res.json());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome
          name="arrow-left"
          size={15}
          color="#1472AE"
          style={{ color: "#1472AE", marginLeft: 30 }}
        />
        {/* //-------------------------------------------------TITRE DE LA PAGE */}
        <Text style={styles.pageTitle}>Récapitulatif</Text>
        <Text
          style={{
            fontSize: 20,
            frontWeight: "bold",
            color: "#1472AE",
            marginRight: 30,
          }}
        >
          2/2
        </Text>
      </View>
      {/* -------------------------------------------------ENCART DU PROFESSIONNEL */}
      <View style={styles.bodyContainer}>
        <View style={styles.recapContainer}>
          <View style={styles.proContainer}>
            <Image
              source={require("../assets/doctorPicture.jpg")}
              style={styles.image}
            />
            {/* <View style={styles.proInfo}>
              <Text style={styles.text}>
                {appointment?.firstname} {appointment?.lastname}
              </Text>
              <Text style={styles.text}>{appointment?.occupation}</Text>
            </View> */}
            {/* ------------------------------------------------- DONNEES DU RDV */}
          </View>
          <View style={styles.rdvInfo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="calendar-month"
                size={40}
                color="#1472AE"
                style={{ marginRight: 8 }}
              />
              <Text>{appointment?.time}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="map"
                size={40}
                color="#1472AE"
                style={{ marginRight: 8 }}
              />
              <Text>{appointment?.address?.street}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="currency-eur"
                size={40}
                color="#1472AE"
                style={{ marginRight: 8 }}
              />
              <Text>{appointment?.price}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="medical-bag"
                size={40}
                color="#1472AE"
                style={{ marginRight: 8 }}
              />
              <Text>{appointment?.selectedReason}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => onClick()}
            style={{
              backgroundColor: confirmed ? "#008000" : "#0B2A59", // vert ou bleu foncé
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
              justifyContent: "center",
            }}
          >
            {confirmed && (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {confirmed ? "Merci !" : "Confirmer le rendez-vous"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    height: "7%",
    backgroundColor: "#ffff",
    borderBottomWidth: 1,
    borderBottomColor: "#1472AE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageTitle: {
    fontWeight: 800,
    fontSize: 26,
    color: "#1472AE",
    marginLeft: 30,
  },

  bodyContainer: {
    height: "93%",
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  recapContainer: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    height: "65%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0D2C56",
    backgroundColor: "#ffff",
  },

  proContainer: {
    padding: 15,
    width: "100%",
    height: 125,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  image: {
    width: "30%",
    height: "100%",
    borderRadius: 50,
  },

  proInfo: {
    width: "60%",
    height: "90%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  text: {
    color: "#ffff",
    fontSize: 20,
  },

  rdvInfo: {
    justifyContent: "space-between",
    borderWidth: 1,
    height: 240,
  },
});
