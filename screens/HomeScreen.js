import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import vetgologo from "../assets/vetgologo.png";

export default function HomeScreen() {
  const navigation = useNavigation();

  // Profession
  const [openProfession, setOpenProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [professionItems, setProfessionItems] = useState([
    { label: "Vétérinaire", value: "veterinaire" },
    { label: "Ostéopathe", value: "osteopathe" },
    { label: "Toiletteur", value: "toiletteur" },
    { label: "Educateur", value: "educateur" },
    { label: "Physiothérapeute", value: "physiotherapeute" },
  ]);

  // Animaux
  const [openAnimal, setOpenAnimal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalItems, setAnimalItems] = useState([
    { label: "Chien", value: "chien" },
    { label: "Chat", value: "chat" },
    { label: "Lapin", value: "lapin" },
    { label: "Cheval", value: "cheval" },
    { label: "Rongeur", value: "rongeur" },
    { label: "Oiseaux", value: "oiseaux" },
    { label: "Bovin", value: "bovin" },
  ]);

  // Lieu avec suggestions API
  const [selectedLieu, setSelectedLieu] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleLieuChange = async (text) => {
    setSelectedLieu(text);
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            text
          )}&limit=5`
        );
        const data = await response.json();
        const results = data.features.map((item) => item.properties.label);
        setSuggestions(results);
      } catch (error) {
        console.error("Erreur API adresse :", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
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
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("Recherche", { adresse: selectedLieu })}
      >
        <Text style={styles.searchText}>Rechercher</Text>
      </TouchableOpacity>

      {/* Lien pro */}
      <TouchableOpacity onPress={() => navigation.navigate("Professionnel")}>
        <Text style={styles.proLink}>Professionnel ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#C2E7F7",
    flexGrow: 1,
    paddingTop: 60,
    alignItems: "center",
  },
  logoEmergency: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoImage: {
    marginTop: 25,
    width: 250,
    height: 200,
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
    marginBottom: 10,
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
    maxHeight: 150,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  searchButton: {
    backgroundColor: "#0D2C56",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    marginTop: 20,
  },
  searchText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  proLink: {
    textAlign: "center",
    marginTop: 25,
    textDecorationLine: "underline",
    color: "#0D2C56",
    fontWeight: "bold",
  },
});
