import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EmergencyScreen() {
  const navigation = useNavigation();

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

  // Lieu (saisie + suggestions)
  const [selectedLieu, setSelectedLieu] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleLieuChange = async (text) => {
    setSelectedLieu(text);
    if (text.length > 2) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(text)}&limit=5`);
        const data = await response.json();
        const results = data.features.map((item) => item.properties.label);
        setSuggestions(results);
      } catch (error) {
        console.error('Erreur API adresse :', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>URGENCES</Text>

      <View style={styles.logoEmergency}>
        <FontAwesome name="ambulance" size={50} color="#FA3034" style={{ transform: [{ scaleX: -1 }] }} />
      </View>

      {/* Animaux */}
      <View>
        <View style={styles.iconLeft}>
          <FontAwesome name="paw" size={30} color="#1472AE" />
        </View>
        <DropDownPicker
          open={openAnimal}
          value={selectedAnimal}
          items={animalItems}
          setOpen={() => {
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
            borderBlockColor: "#1472AE"
          }}
          zIndex={2000}
          zIndexInverse={2000}
        />
      </View>

      {/* Lieu */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={[styles.iconLeft, { zIndex: 1001, left: '7%' }]}>
          <FontAwesome name="map-marker" size={30} color="#1472AE" />
        </View>

        <TextInput
          placeholder="Lieu"
          value={selectedLieu}
          onChangeText={handleLieuChange}
          style={styles.textInputLieu}
          placeholderTextColor="#999"
        />

        {/* Suggestions d'adresses */}
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

      {/* Bouton Rechercher */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("RechercherUrgence", { adresse: selectedLieu })}
      >
        <Text style={styles.searchText}>Rechercher</Text>
      </TouchableOpacity>

      {/* Liens bas */}
      <TouchableOpacity onPress={() => navigation.navigate("LienQuestion")}>
        <Text style={styles.linkQuestion}>Qu'est-ce qu'une urgence ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LienFaq")}>
        <Text style={styles.linkFaq}>FAQ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#C2E7F7',
  },
  title: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoEmergency: {
    marginTop: 10,
    marginBottom: 50,
  },
  dropdown: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#1472AE',
    height: 55,
    width: '85%',
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
  iconLeft: {
    width: 50,
    height: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    zIndex: 2001,
  },
  textInputLieu: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#1472AE',
    borderWidth: 1,
    height: 55,
    width: '85%',
    paddingLeft: 100, // ajusté pour alignement avec "Animaux"
    fontSize: 18,
    backgroundColor: 'white',
    color: '#000',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  suggestionList: {
    width: '85%',
    maxHeight: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  searchButton: {
    backgroundColor: '#0D2C56',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 5,
  },
  searchText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkQuestion: {
    textAlign: 'center',
    marginTop: 50,
    textDecorationLine: 'underline',
    color: '#0D2C56',
    fontWeight: 'bold',
  },
  linkFaq: {
    textAlign: 'center',
    marginTop: 25,
    textDecorationLine: 'underline',
    color: '#0D2C56',
    fontWeight: 'bold',
  },
});