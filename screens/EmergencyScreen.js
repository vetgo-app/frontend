import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'; //flatlist poour afficher les suggestions, TextImput pour le champ texte.
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'; //menu déroulant pour animal



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


    //LIEU
    const [query, setQuery] = useState('');                               //Contient le texte que tape l'utilisateur dans Lieu
    const [suggestions, setSuggestions] = useState([]);                   //Contient la liste des suggestions retournées par l'API
    const [selectedAddress, setSelectedAddress] = useState('');           //Contient l'adresse que l'utilisateur choisi


    //Appel à l’API Adresse
    async function fetchAddresses(text) {
        setQuery(text);
        if (text.length < 3) {
            setSuggestions([]);
            return;
        }  //Si l'utilisateur a tapé au moins 3 caractères
           //on appelle l'API du gouv + encodeURIComponent évite les erreurs dans l'URL 
        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(text)}&limit=5`);
            const data = await response.json();
            setSuggestions(data.features); //on stockeles suggestions dans le tableau suggestions
        } catch (error) {
            console.error("Erreur adresse :", error); //Si l'appel échoue, on affiche une erreur dans la console
        }
    }

    //Fonction pour envoyer les données au serveur (animal + adresse)
    async function postJSON(dataAddresses) {
        try { 
            const reponse = await fetch("https://exemple.com/urgences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataAddresses),
            });  //on  envoit les donnéesen JSON au backend

            const resultat = await reponse.json();
            console.log("Réussite :", resultat);
        } catch (erreur) {
            console.error("Erreur :", erreur);
        } //on affiche la réponse du serveur ou une erreur si ça échoue
    }

    const handleSearch = () => {
        const dataAddresses = {
            animal: selectedAnimal,
            address: selectedAddress,
        };
        postJSON(dataAddresses);
    }; //Quand on clique sur rechercher on envoie l'animal et l'adresse selectionnés


    return (
        <View style={styles.container} keyboardShouldPersistTaps="handled">
            {/* Header */}
            <Text style={styles.title}>URGENCES</Text>

            <View style={styles.logoEmergency}>
                <FontAwesome name="ambulance" size={50} color="#FA3034" style={{ transform: [{ scaleX: -1 }], }} />
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

            <View style={{ width: 50, height: 50, position: "absolute", zIndex: 1001, justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                <FontAwesome name="map-marker" size={30} color="#1472AE" />
                <TextInput style={styles.input}
                           placeholder="Adresse"
                           value={selectedAddress || query}
                           onChangeText={Adress}
                />  {/* L'utilisateur tape son adresse et la fonction fectchAddresses est appelée à chaque modification*/}
            </View>

            <FlatList data={suggestions}
                      renderItem={({ item }) => (
                           <TouchableOpacity onPress={() => {
                               setSelectedAddress(item.properties.label);
                               setSuggestions([]);
                       }}>
                              <Text>{item.properties.label}</Text>
                           </TouchableOpacity>
                    )}
            /> 
            {/* Ca affiche une liste de résultats sous le champs + cliquable + au clic l'adresse est selectionnée et la liste disparait */}



            {/* Bouton Rechercher */}
            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => navigation.navigate("RechercherUrgence")}
            >
                <Text style={styles.searchText}>Rechercher</Text>
            </TouchableOpacity>

            {/* Lien qu'est ce qu'une urgence */}
            <TouchableOpacity
                onPress={() => navigation.navigate("LienQuestion")}
            >
                <Text style={styles.linkQuestion}>Qu'est-ce qu'une urgence ?</Text>
            </TouchableOpacity>

            {/* Lien FAQ */}
            <TouchableOpacity
                onPress={() => navigation.navigate("LienFaq")}
            >
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

