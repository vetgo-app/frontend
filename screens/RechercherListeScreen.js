import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import vetgologo from "../assets/vetgologo.png";

export default function RechercherListeScreen({ navigation, route }) {
  const { profession, animal, address } = route.params;
  const [store, setStore] = useState([]);
  const time = "10h00";
  const [region, setRegion] = useState(null); //Stocke la zone à afficher sur la carte (latitude, longitude)
  const [veterinaires, setVeterinaires] = useState([]); // Stocke la liste des vétérinaires à afficher.
  const [activeFilter, setActiveFilter] = useState(null); //Stocke le filtre sélectionné ("Au + tôt", "À Domicile", etc.)

  // récupération des vétérinaires fictifs autour d'une address
  useEffect(() => {
    if (address) {
      fetch(
        `https://api-address.data.gouv.fr/search/?q=${encodeURIComponent(
          address
        )}&limit=5`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.features.length > 0) {
            const coords = data.features[0].geometry.coordinates;
            const longitude = coords[0];
            const latitude = coords[1];

            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });

            setVeterinaires([
              {
                nom: "Isabelle Veto",
                specialite: "Vétérinaire",
                distance: "100 m",
                image: "photo",
                lat: latitude + 0.002,
                lon: longitude + 0.001,
              },
            ]);
          }
        });
    } else {
      const latitude = 48.866667;
      const longitude = 2.333333;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setVeterinaires([
        {
          nom: "Isabelle Veto",
          specialite: "Vétérinaire",
          distance: "100 m",
          image: "photo",
          lat: latitude + 0.002,
          lon: longitude + 0.001,
        },
      ]);
    }
  }, [address]);

  // récupération des praticiens depuis la BDD
  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/store")
      .then((response) => response.json())
      .then((data) => {
        let filteredStores = data.data;

        if (profession) {
          filteredStores = filteredStores.filter(
            (store) =>
              store.occupation.toLowerCase() === profession.toLowerCase()
          );
        }
        if (animal) {
          filteredStores = filteredStores.filter(
            (store) =>
              store.specialization.toLowerCase() === animal.toLowerCase()
          );
        }
        if (address) {
          filteredStores = filteredStores.filter((store) =>
            store.address.city.toLowerCase().includes(address.toLowerCase())
          );
        }
        setStore(filteredStores);
      });
  }, [profession, address, animal]);

  //envoie vers la page 3 pour la recherche de pro rdv
  const handleNavigation = (elem) => {
    navigation.navigate("InfoProScreen", {
      firstname: elem.user?.firstname,
      lastname: elem.user?.lastname,
      occupation: elem.occupation,
      address: elem.address,
      price: elem.price,
      time,
    });
  };

  //le '?' permet d'attendre des données asynchrone (venant du fetch)
  const card = store?.map((e, i) => {
    console.log("test firstname", card);
    return (
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
              {e?.user?.firstname}
              {e?.user?.lastname}
            </Text>
            <Text style={styles.text}>{e.occupation}</Text>
            <Text style={styles.text}>{e.address.street}</Text>
            <Text style={styles.text}>{e.address.city}</Text>
          </View>
        </View>
        <View style={styles.dispo}>
          <Text>
            Prochaine disponibilité :{" "}
            <Text style={styles.span}>mardi 6 mai</Text>
          </Text>
        </View>
        <View style={styles.date}>
          <TouchableOpacity
            style={styles.btnDate}
            onPress={() => handleNavigation(e)}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dispoLink}>
          <Text style={styles.dispoLinkText}>Voir plus de disponiblité</Text>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView>
          <View style={styles.styleContainer}>
            {/* Filtres */}
            <View style={styles.filtre}>
              <Text style={styles.filtreText}>Au + tôt</Text>
              <Text style={styles.filtreText}>À domicile</Text>
              <Text style={styles.filtreText}>Visio</Text>
            </View>

            {/* Carte */}
            {region && (
              <MapView style={styles.map} region={region}>
                {veterinaires.map((vet, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: vet.lat, longitude: vet.lon }}
                    title={vet.nom}
                    description={vet.specialite}
                  >
                    <FontAwesome name="paw" size={30} color="#1472AE" />
                  </Marker>
                ))}
              </MapView>
            )}

            {/* Affichage des cards */}
            {card}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// console.log(card?.length);

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
    marginTop: 10,
    marginBottom: 10,
  },
  filtreText: {
    color: "#1472AE",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 250,
  },
  h2: {
    fontSize: 20,
    color: "white",
  },

  btnDate: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "lightgrey",
  },
  coordonneesText: {
    alignItems: "center",
    marginLeft: 10,
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

//timestemp
