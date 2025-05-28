import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import vetgologo from '../assets/vetgologo.png';

export default function RechercherListeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const adresse = route.params?.adresse;

  const [store, setStore] = useState([]);
  const time = "10h00";
  const [region, setRegion] = useState(null);  //Stocke la zone à afficher sur la carte (latitude, longitude)
  const [veterinaires, setVeterinaires] = useState([]); // Stocke la liste des vétérinaires à afficher.
  const [activeFilter, setActiveFilter] = useState(null); //Stocke le filtre sélectionné ("Au + tôt", "À Domicile", etc.)

  // récupération des vétérinaires fictifs autour d'une adresse
  useEffect(() => {
    if (adresse) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse)}&limit=5`)
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
  }, [adresse]);

  // récupération des praticiens depuis la BDD
  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/store")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setStore(data.data);
      });
  }, []);

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


  //permet de déselectionner un filtre actif en cliquant à nouveau dessus:
  const handleFilterPress = (filter) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  //le '?' permet d'attendre des données asynchrone (venant du fetch)
  const card = store?.map((e) => (
    <View key={e._id} style={styles.card}>
      <TouchableOpacity
        style={styles.coordonnees}
        onPress={() => handleNavigation(e)}
      >
        <Image
          style={styles.image}
          source={require("../assets/doctorPicture.jpg")}
        />
        <View style={styles.coordonneesText}>
          <Text style={styles.h2}>
            {e?.user?.firstname} {e?.user?.lastname}
          </Text>
          <Text style={styles.text}>{e.occupation}</Text>
          <Text style={styles.text}>{e.address.street}</Text>
          <Text style={styles.text}>{e.address.city}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.dispo}>
        <Text>Prochaine disponibilité : <Text style={styles.span}>mardi 6 mai</Text></Text>
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
        <Text style={styles.dispoLinkText}>Voir plus de disponibilité</Text>
      </View>
    </View>
  ));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView>
          {/* Header avec bouton retour */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("RetourHomeScreen")}>
              <FontAwesome name="arrow-left" size={24} color="#1472AE" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Trouver un professionnel</Text>
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

          {/* Filtres */}
          <View style={styles.filtre}>
            <Text style={styles.filtreLabel}>Filtres :</Text>
            {['Au + tôt', 'À domicile', 'Visio'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => handleFilterPress(filter)}
                style={[
                  styles.filtreButton,
                  activeFilter === filter && styles.filtreButtonActive
                ]}
              >
                <Text style={[
                  styles.filtreText,
                  activeFilter === filter && styles.filtreTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Affichage des cartes professionnelles */}
          <View style={{ alignItems: "center", paddingBottom: 40 }}>
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
    backgroundColor: "#F4F4F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1472AE",
    alignItems: "right",
  },
  map: {
    width: "100%",
    height: 260,
  },
  filtre: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  filtreLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'center',
  },

  filtreButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#C2E7F7",
  },
  filtreButtonActive: {
    backgroundColor: "#0D2C56",
  },
  filtreText: {
    color: "#0D2C56",
    fontSize: 16,
    fontWeight: "regular",
  },
  filtreTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderColor: "#1472AE",
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  coordonnees: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D2C56",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  coordonneesText: {
    marginLeft: 10,
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
  dispo: {
    borderTopWidth: 1,
    borderColor: "#1472AE",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  span: {
    fontWeight: "bold",
  },
  date: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "#fff",
  },
  btnDate: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 14,
    backgroundColor: "lightgrey",
  },
  dispoLink: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dispoLinkText: {
    color: "#1472AE",
    textDecorationLine: "underline",
  },
});