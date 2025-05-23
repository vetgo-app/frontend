import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import vetgologo from '../assets/vetgologo.png';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Profession
  const [openProfession, setOpenProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [professionItems, setProfessionItems] = useState([
    { label: 'Vétérinaire', value: 'veterinaire' },
    { label: 'Ostéopathe', value: 'osteopathe' },
    { label: 'Toiletteur', value: 'toiletteur' },
    { label: 'Educateur', value: 'educateur' },
    { label: 'Physiothérapeute', value: 'physiotherapeute' },
  ]);

  // Animaux
  const [openAnimal, setOpenAnimal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalItems, setAnimalItems] = useState([
    { label: 'Chien', value: 'chien' },
    { label: 'Chat', value: 'chat' },
    { label: 'Lapin', value: 'lapin' },
    { label: 'Cheval', value: 'cheval' },
    { label: 'Rongeur', value: 'rongeur' },
    { label: 'Oiseaux', value: 'oiseaux' },
    { label: 'Bovin', value: 'bovin' },
  ]);

  // Lieu
  const [openLieu, setOpenLieu] = useState(false);
  const [selectedLieu, setSelectedLieu] = useState(null);
  const [lieuItems, setLieuItems] = useState([
    { label: 'Paris', value: 'paris' },
    { label: 'Lyon', value: 'lyon' },
    { label: 'Marseille', value: 'marseille' },
  ]);

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.logoEmergency}>
        <TouchableOpacity onPress={() => navigation.navigate('Urgences')}>
          <FontAwesome name="ambulance" size={50} color="#FA3034" style={{ transform: [{ scaleX: -1 }], }} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={vetgologo} style={styles.logoImage} />
      </View>

      {/* Profession */}

      <View>
        <View style={{ width: 50, height: 50, position: "absolute", zIndex: 3001, justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
          <FontAwesome name="user-md" size={30} color="#1472AE" />
        </View>
        <DropDownPicker
          open={openProfession}
          value={selectedProfession}
          items={professionItems}
          setOpen={() => {
            setOpenProfession(!openProfession)
            setOpenAnimal(false)
            setOpenLieu(false)
          }}
          setValue={setSelectedProfession}
          setItems={setProfessionItems}
          placeholder="Profession"
          textStyle={styles.dropdownText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemContainerStyle={{
            borderBottomWidth: 1,
            borderBlockColor: "#1472AE"
          }}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>


      {/* Animaux */}
      <View>
        <View style={{ width: 50, height: 50, position: "absolute", zIndex: 2001, justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
          <FontAwesome name="paw" size={30} color="#1472AE" />
        </View>
        <DropDownPicker
          open={openAnimal}
          value={selectedAnimal}
          items={animalItems}
          setOpen={() => {
            setOpenProfession(false)
            setOpenAnimal(!openAnimal)
            setOpenLieu(false)
          }} setValue={setSelectedAnimal}
          setItems={setAnimalItems}
          placeholder="Animaux"
          textStyle={styles.dropdownText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemContainerStyle={{
            borderBottomWidth: 1,
            borderBlockColor: "#1472AE"
          }}
          zIndex={2000}
          zIndexInverse={2000}
        />
      </View>



      {/* Lieu */}
      <View>
        <View style={{ width: 50, height: 50, position: "absolute", zIndex: 1001, justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
          <FontAwesome name="map-marker" size={30} color="#1472AE" />
        </View>

        <DropDownPicker
          open={openLieu}
          value={selectedLieu}
          items={lieuItems}
          setOpen={() => {
            setOpenProfession(false)
            setOpenAnimal(false)
            setOpenLieu(!openLieu)
          }} setValue={setSelectedLieu}
          setItems={setLieuItems}
          placeholder="Lieu"
          textStyle={styles.dropdownText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemContainerStyle={{
            borderBottomWidth: 1,
            borderBlockColor: "#1472AE"
          }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>


      {/* Bouton Rechercher */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("Recherche")}
      >
        <Text style={styles.searchText}>Rechercher</Text>
      </TouchableOpacity>

      {/* Lien Pro */}
      <TouchableOpacity onPress={() => navigation.navigate("Professionnel")}>
        <Text style={styles.proLink}>Professionnel ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#C2E7F7',
    flexGrow: 1,
    paddingTop: 60,
    alignItems: 'center',
  },


  logoImage: {
    width: 250,
    height: 200,
    paddingTop: 50,
    alignItems: 'center',
  },

  dropdown: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#1472AE',
    zIndex: 1,
    height: 55,
    width: '85%',
    alignItems: 'center',

  },

  dropdownText: {
    fontSize: 18,
    textAlign: 'center',
  },


  dropdownContainer: {
    borderColor: '#1472AE',
    width: '85%',
    height: 200,

  },

  searchButton: {
    backgroundColor: '#0D2C56',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,

  },
  searchText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  proLink: {
    textAlign: 'center',
    marginTop: 25,
    textDecorationLine: 'underline',
    color: '#0D2C56',
    fontWeight: 'bold',
  },
});