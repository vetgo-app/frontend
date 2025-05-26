import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const urlBack = process.env.EXPO_PUBLIC_BACKEND_URL;
export default function EmergencyScreen() {
  const navigation = useNavigation();

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

  // Lieu
  const [openLieu, setOpenLieu] = useState(false);
  const [selectedLieu, setSelectedLieu] = useState(null);
  const [lieuItems, setLieuItems] = useState([
    { label: "Paris", value: "paris" },
    { label: "Lyon", value: "lyon" },
    { label: "Marseille", value: "marseille" },
  ]);

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <Text style={styles.title}>URGENCES</Text>
      <FontAwesome
        name="ambulance"
        size={50}
        color="#FA3034"
        style={{ transform: [{ scaleX: -1 }] }}
      />

      {/* Animaux */}
      <View>
        <View
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            zIndex: 2001,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <FontAwesome name="paw" size={30} color="#1472AE" />
        </View>
        <DropDownPicker
          open={openAnimal}
          value={selectedAnimal}
          items={animalItems}
          setOpen={() => {
            setOpenAnimal(!openAnimal);
            setOpenLieu(false);
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
      <View>
        <View
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            zIndex: 1001,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <FontAwesome name="map-marker" size={30} color="#1472AE" />
        </View>

        <DropDownPicker
          open={openLieu}
          value={selectedLieu}
          items={lieuItems}
          setOpen={() => {
            setOpenAnimal(false);
            setOpenLieu(!openLieu);
          }}
          setValue={setSelectedLieu}
          setItems={setLieuItems}
          placeholder="Lieu"
          textStyle={styles.dropdownText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemContainerStyle={{
            borderBottomWidth: 1,
            borderBlockColor: "#1472AE",
          }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>

      {/* Bouton Rechercher */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("RechercherUrgence")}
      >
        <Text style={styles.searchText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
