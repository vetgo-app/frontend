import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Modal,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import vetgologo from "../assets/vetgologo.png";
import { useSelector } from "react-redux";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";

export default function HomeScreen({ navigation }) {
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = useState(false);
  const user = useSelector((state) => state.user.value);

  // Profession
  const [openProfession, setOpenProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [professionItems, setProfessionItems] = useState([
    { label: "Vétérinaire", value: "vétérinaire" },
    { label: "Ostéopathe", value: "ostéopathe" },
    { label: "Toiletteur", value: "toiletteur" },
    { label: "Educateur", value: "educateur" },
    { label: "Physiothérapeute", value: "physiothrapeute" },
  ]);

  // Animaux
  const [openAnimal, setOpenAnimal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalItems, setAnimalItems] = useState([
    { label: "Non spécifié", value: null },
    { label: "Chien 🐶", value: "chien" },
    { label: "Chat 🐈", value: "chat" },
    { label: "Lapin 🐰", value: "lapin" },
    { label: "Cheval 🐎", value: "cheval" },
    { label: "Rongeur 🐭", value: "rongeur" },
    { label: "Oiseaux 🦜", value: "oiseaux" },
    { label: "Bovin 🐮", value: "bovin" },
  ]);

  // Lieu avec suggestions API
  const [selectedLieu, setSelectedLieu] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      if (selectedLieu.length > 3) {
        try {
          const response = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
              selectedLieu
            )}&limit=5`
          );
          const data = await response.json();
          const results = data.features?.map((item) => item.properties.label) || [];

          setSuggestions(results);
        } catch (error) {
          console.error("Erreur API adresse :", error);
        }
      } else {
        setSuggestions([]);
      }
    })()

  }, [selectedLieu])

  const handleLieuChange = async (text) => {
    setSelectedLieu(text);
  };

  return (
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Ambulance button */}
      <View style={styles.logoEmergency}>
        <TouchableOpacity onPress={() => navigation.navigate("Urgences")}>
          <FontAwesome
            name="ambulance"
            size={50}
            color="#FA3034"
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.header}>
        <Image source={vetgologo} style={styles.logoImage} />
      </View>

      {/* Profession */}
      <View style={styles.body}>
        <View style={styles.searchSettings}>
          <View>
            <View style={styles.iconPosition(3001)}>
              <FontAwesome name="user-md" size={30} color="#1472AE" />
            </View>
            <DropDownPicker
              open={openProfession}
              value={selectedProfession}
              items={professionItems}
              setOpen={() => {
                setOpenProfession(!openProfession);
                setOpenAnimal(false);
              }}
              setValue={setSelectedProfession}
              setItems={setProfessionItems}
              placeholder="Profession"
              textStyle={styles.dropdownText}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listItemContainerStyle={{
                borderBottomWidth: 1,
                borderBlockColor: "#1472AE",
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          {/* Animaux */}
          <View>
            <View style={styles.iconPosition(2001)}>
              <FontAwesome name="paw" size={30} color="#1472AE" />
            </View>
            <DropDownPicker
              open={openAnimal}
              value={selectedAnimal}
              items={animalItems}
              setOpen={() => {
                setOpenProfession(false);
                setOpenAnimal(!openAnimal);
              }}
              setValue={setSelectedAnimal}
              setItems={setAnimalItems}
              placeholder="Animaux"
              textStyle={styles.dropdownText}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listItemContainerStyle={{
                borderBottomWidth: 1,
                borderBlockColor: "#1472AE",
              }}
              zIndex={2000}
              zIndexInverse={2000}
            />
          </View>

          {/* Lieu */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={[styles.iconPosition(1001), { left: "7%" }]}>
              <FontAwesome name="map-marker" size={30} color="#1472AE" />
            </View>
            <TextInput
              placeholder="Lieu"
              value={selectedLieu}
              onChangeText={handleLieuChange}
              style={styles.textInputLieu}
              placeholderTextColor="#999"
            />
            <FlatList
              data={suggestions}
              zIndex={1000}
              zIndexInverse={2000}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLieu(item);
                    setSuggestions([]);
                  }}
                  style={styles.suggestionItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          </View>

          {/* Rechercher */}

        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() =>
            navigation.navigate("Recherche", {
              // récupérer le filtre profession, animal et lieux pour la page suivante rechercher
              profession: selectedProfession,
              animal: selectedAnimal,
              address: selectedLieu,
            })
          }
        >
          <Text style={styles.searchText}>Rechercher</Text>
        </TouchableOpacity>
        {!user.token && (
          <View style={styles.signInUpContainer}>
            <Text style={{ fontSize: 15, fontWeight: 700, color: "#1472AE" }}>
              Vous ne semblez pas connecté.e !
            </Text>
            <View style={styles.SignInUpButtons}>
              {!user.token && (
                <TouchableOpacity
                  onPress={() => setModalSignInVisible(true)}
                  style={styles.buttonStyle}
                >
                  <Text style={{ fontWeight: 700, color: "#fff" }}>
                    Se connecter
                  </Text>
                </TouchableOpacity>
              )}
              {!user.token && (
                <TouchableOpacity
                  onPress={() => setModalSignUpVisible(true)}
                  style={styles.buttonStyle}
                >
                  <Text style={{ fontWeight: 700, color: "#fff" }}>
                    S'inscrire
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        <Modal visible={modalSignInVisible} animationType="none">
          <SignIn
            setModalSignInVisible={setModalSignInVisible}
            modalSignInVisible={modalSignInVisible}
            navigation={navigation}
          />
        </Modal>
        <Modal visible={modalSignUpVisible} animationType="none">
          <SignUp
            setModalSignUpVisible={setModalSignUpVisible}
            modalSignUpVisible={modalSignUpVisible}
            navigation={navigation}
          />
        </Modal>

        {/* Lien pro */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Professionnel")}>
        <Text style={styles.proLink}>Professionnel ?</Text>
      </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E7F7",
    alignItems: "center",
  },

  logoEmergency: {
    position: "absolute",
    top: 50,
    right: 20,
  },

  header: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  body: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  logo: {
    borderWidth: 1,
  },

  searchSettings: {
    width: '80%',
    height: 200,
    alignItems: 'center',
  },

  logoImage: {
    width: 250,
    height: 70,
  },

  dropdown: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#1472AE",
    height: 55,
    width: "85%",
  },
  dropdownText: {
    fontSize: 18,
    textAlign: "center",
  },
  dropdownContainer: {
    borderColor: "#1472AE",
    width: "85%",
    height: 200,
  },
  iconPosition: (z) => ({
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: z,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  }),

  textInputLieu: {
    borderRadius: 10,
    borderColor: "#1472AE",
    borderWidth: 1,
    height: 55,
    width: "85%",
    paddingLeft: 100,
    fontSize: 18,
    backgroundColor: "white",
    color: "#000",
    textAlign: "left",
    textAlignVertical: "center",
  },

  suggestionList: {
    width: "85%",
    maxHeight: 100,
    backgroundColor: "white",
  },

  suggestionItem: {
    padding: 10,
    borderColor: "#1472AE",
    borderWidth: 1,
  },

  searchButton: {
    backgroundColor: "#0D2C56",
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },

  searchText: {
    color: "white",
    fontWeight: "bold",
  },
  proLink: {
    textAlign: "center",
    marginTop: 25,
    textDecorationLine: "underline",
    color: "#0D2C56",
    fontWeight: "bold",
  },

  signInUpContainer: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
  },

  SignInUpButtons: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonStyle: {
    width: 140,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
});
