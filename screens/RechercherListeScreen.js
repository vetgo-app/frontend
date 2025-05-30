import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import vetgologo from "../assets/vetgologo.png";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
const time = ["10h00", "11h00", "12h00", "14h00", "15h00", "17h00"];

function HourComponent(props) {
  // faire un composant pour fonction des heures
  return (
    <>
      {time.map((e, i) => {
        //afficher toutes les heures du tableau time
        return (
          <TouchableOpacity
            key={i}
            onPress={() => props.handleSelect(e)} //à l'appuie je capte uniquement l'heure selectionnée.
            style={styles.hour}
          >
            <Text style={styles.hourDate}>{e}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

export default function RechercherListeScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const { profession, animal, address } = route.params;

  const [store, setStore] = useState([]);
  const [region, setRegion] = useState(null); //Stocke la zone à afficher sur la carte (latitude, longitude)
  const [veterinaires, setVeterinaires] = useState([]); // Stocke la liste des vétérinaires à afficher.
  // console.log("veterinaires", veterinaires);

  const [activeFilter, setActiveFilter] = useState(null); //Stocke le filtre sélectionné ("Au + tôt", "À Domicile", etc.)
  const [selectedHour, setSelectedHour] = useState(""); // stock l'heure de rdv selectionnée

  const initializeMap = async () => {
    if (address) {
      // Si on a une addresse, on centre la carte sur l'adresse
      const fetchUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
        address
      )}&limit=5`;
      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data?.features?.length > 0) {
            const coords = data.features[0].geometry.coordinates;
            const longitude = coords[0];
            const latitude = coords[1];

            // on centre la carte sur cette adresse, avec un certain zoom delta
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        });
    } else {
      // Sinon affiche Paris par défaut:
      const latitude = 48.866667;
      const longitude = 2.333333;

      //on centre la carte
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const filterStores = async () => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/store")
      .then((response) => response.json())
      .then((data) => {
        let filteredStores = [...data.data];

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

        if (activeFilter) {
          filteredStores = filteredStores.filter((store) => {
            if (activeFilter === "À domicile") {
              return store.isSelectedDom;
            } else {
              if (activeFilter === "Visio") {
                return store.isSelectedVisio;
              }
            }
          });
        }

        //professionnels qui se filtrent en fonction de l'adresse
        const markers = filteredStores
          .filter((store) => store.address.geo?.lat && store.address.geo?.lon)
          .map((store) => ({
            nom: store.user?.firstname + " " + store.user?.lastname,
            specialite: store.occupation,
            lat: store.address.geo.lat,
            lon: store.address.geo.lon,
          }));

        // console.log(filteredStores.filter((store) => store));

        //tous les professionnels s'affichent
        setStore(filteredStores);
        setVeterinaires(markers);

        // on recentre la carte sur le premier praticien si pas déjà centrée
        if (markers.length > 0 && !region) {
          const first = markers[0];
          setRegion({
            latitude: first.lat,
            longitude: first.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      });
  };

  //récupération des vétérinaires fictifs autour d'une adresse
  useEffect(() => {
    (async () => {
      // Step 1 : Centrer la carte
      !region && (await initializeMap());

      // Step 2 : On récupère les filtres pour la map
      await filterStores();
    })();
  }, [isFocused, region, activeFilter]);

  //envoie vers la page 3 pour la recherche de pro rdv
  const handleNavigation = (elem, hour) => {
    navigation.navigate("InfoProScreen", {
      firstname: elem.user?.firstname,
      lastname: elem.user?.lastname,
      occupation: elem.occupation,
      address: elem.address,
      price: elem.price,
      selectedHour: hour,
    });
  };

  //permet de déselectionner un filtre actif en cliquant à nouveau dessus:
  const handleFilterPress = (filter) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  //le '?' permet d'attendre des données asynchrone (venant du fetch)
  const card = store?.map((e, i) => {
    console.log(e.user.photo);
    return (
      <View key={e._id} style={styles.card}>
        <View style={styles.coordonnees}>
          <Image style={styles.image} source={{ uri: e.user.photo }} />

          <View style={styles.coordonneesText}>
            <Text style={styles.h2}>
              {e?.user?.firstname} {e?.user?.lastname}
            </Text>
            {/* methode charAt .... => pour gerer la majuscule de la profession */}
            <Text style={styles.text}>
              {e.occupation.charAt(0).toUpperCase() +
                String(e.occupation).slice(1)}
            </Text>
            <Text style={styles.text}>
              {e.address.street}, {e.address.zipCode} {e.address.city}
            </Text>
          </View>
        </View>
        <View style={styles.dispo}>
          <Text>
            Prochaine disponibilité :{" "}
            <Text style={styles.span}>mardi 6 mai</Text>
          </Text>
        </View>
        <View style={styles.date}>
          <TouchableOpacity style={styles.btnDate}>
            <HourComponent
              handleSelect={(hour) => {
                handleNavigation(e, hour);
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.dispoLink}>
            <Text style={styles.dispoLinkText}>Voir plus de disponiblité</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.dispo}>
          <Text>
            Prochaine disponibilité :{" "}
            <Text style={styles.span}>mercredi 7 mai</Text>
          </Text>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView>
          {/* Header avec bouton retour */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={24} color="#1472AE" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Trouver un professionnel</Text>
          </View>

          {/* Carte */}

          <MapView style={styles.map} region={region}>
            {veterinaires?.map((vet, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: vet.lat, longitude: vet.lon }}
                title={vet.nom}
                description={vet.specialite}
              >
                <Image
                  source={require("../assets/iconPaw.png")}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </Marker>
            ))}
          </MapView>

          {/* Filtres */}
          <View style={styles.filtre}>
            <Text style={styles.filtreLabel}>Filtres :</Text>
            {["À domicile", "Visio"].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => handleFilterPress(filter)}
                style={[
                  styles.filtreButton,
                  activeFilter === filter && styles.filtreButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filtreText,
                    activeFilter === filter && styles.filtreTextActive,
                  ]}
                >
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
    backgroundColor: "#FFFFFF",
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
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    marginRight: 10,
    alignSelf: "center",
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
    width: "100%",
    justifyContent: "space-around",
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

  viewDate: {
    backgroundColor: "red",
  },

  date: {
    width: "100%",
    alignItems: "center",
  },

  btnDate: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  hour: {
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#0D2C56",
    borderRadius: 10,
    padding: 10,
    width: 100,
  },

  hourDate: {
    textAlign: "center",
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
