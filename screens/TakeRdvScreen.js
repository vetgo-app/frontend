import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  CheckBox,
  Modal,
} from "react-native";
import React, { useState, useMemo } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Checkbox from "expo-checkbox";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const data = [
  { value: "Soins préventifs", label: "Soins préventifs" },
  { value: "Maladies et urgences", label: "Maladies et urgences" },
  { value: "Suivi et soins spécifiques", label: "Suivi et soins spécifiques" },
];

export default function TakeRdvScreen({ navigation, route }) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [errorReason, setErrorReason] = useState(null)
  const [isSelectedReason, setIsSelectedReason] = useState(false);

  const [isFirstRdv, setIsFirstRdv] = useState(true);
  const [isMyAnimal, setIsMyAnimal] = useState(true);
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = useState(false);

  const [pet, setPet] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSelectedAnimal, setIsSelectedAnimal] = useState(false)
  const user = useSelector((state) => state.user.value);
  const { firstname, lastname, occupation, price, address, selectedHour } =
    route.params;


  // Initialisation de l'état au lancement du screen et re-render si modification de ce dernier
  //  pour les animaux rattachés à un utilisateur :
  useEffect(() => {
    if (!user.token) return;
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
      "/petDocuments/byOwner/" +
      user.token
    ).then((response) => response.json().then((data) => setPet(data.pets)));
  }, []);

  // fonction enregistrant le motif du rdv au click
  const handlePressReason = (value) => {
    setSelectedReason(value);
    setIsSelectedReason(!isSelectedReason);
  };

  // Fonction enregistrant l'animal concerné par le rdv
  const handlePressAnimal = (value) => {
    setSelectedPet(value)
    setIsSelectedAnimal(!isSelectedAnimal)
  };

  // Module pour les boutons oui ou non
  const RadioButtons = useMemo(
    () => [
      {
        id: true, // acts as primary key, should be unique and non-empty string
        label: "Oui",
        value: "Oui",
      },
      {
        id: false,
        label: "Non",
        value: "Non",
      },
    ],
    []
  );

  // -------------------------------------------------FONCTION POUR NAVIGUER VERS LA PAGE DE CONFIRMATION DU RDV
  const handleBookRdvkClick = () => {
    setErrorReason(''); // motif pour

    if (!selectedReason) {
      setErrorReason("Veuillez selectionner un motif !");
      ;
    } else if (!selectedPet) {
      setErrorReason("Veuillez selectionner unanimal !");
      return
    }

    // Navigation vers le Screen RdvConf. avec transmission des données en deuxième argument
    navigation.navigate("RdvConfirmation", {
      firstname,
      lastname,
      selectedPet,
      occupation,
      price,
      address,
      selectedHour,
      selectedReason,
      isFirstRdv,
      isMyAnimal,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalSignInVisible} animationType="none">
        <SignIn
          setModalSignInVisible={setModalSignInVisible}
          modalSignInVisible={modalSignInVisible}
          navigation={navigation}
          formData={{
            firstname,
            lastname,
            occupation,
            price,
            address,
            selectedHour,
            selectedReason,
            isFirstRdv,
            isMyAnimal,
          }}
        />
      </Modal>
      <Modal visible={modalSignUpVisible} animationType="none">
        <SignUp
          setModalSignUpVisible={setModalSignUpVisible}
          modalSignUpVisible={modalSignUpVisible}
          navigation={navigation}
          formData={{
            firstname,
            lastname,
            occupation,
            price,
            address,
            selectedHour,
            selectedReason,
            isFirstRdv,
            isMyAnimal,
          }}
        />
      </Modal>
      <View style={styles.headerContainer}>
        <FontAwesome
          name="arrow-left"
          size={15}
          style={{ color: "#1472AE", marginLeft: 30 }}
          onPress={() => navigation.goBack()}
        />
        {/* //-------------------------------------------------TITRE DE LA PAGE */}
        <Text style={styles.pageTitle}>Votre rendez-vous</Text>
        <Text
          style={{
            fontSize: 20,
            frontWeight: "bold",
            color: "#1472AE",
            marginRight: 30,
          }}
        >
          1/2
        </Text>
      </View>
      {/* -------------------------------------------------ENCART DU PROFESSIONNEL */}
      <View style={styles.bodyContainer}>
        <View style={styles.coordonnees}>
          <Image
            style={styles.image}
            source={require("../assets/doctorPicture.jpg")}
          />
          <View style={styles.coordonneesText}>
            <Text style={styles.h2}>
              {firstname}
              {lastname}
            </Text>
            <Text style={styles.text}>
              {occupation.charAt(0).toUpperCase() + String(occupation).slice(1)}
            </Text>
            <Text style={styles.text}>
              {address.street}, {address.zipCode} {address.city}
            </Text>
          </View>
        </View>
        <View style={styles.reasons}>
          <Text style={{ fontWeight: 700, marginBottom: 20 }}>
            Selectionner un motif :
          </Text>
          <FlatList
            horizontal={true}
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              padding: (5, 15),
              borderRadius: 15,

            }}
            keyExtractor={(item) => item.value}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlePressReason(item.value)}
                style={{
                  marginLeft: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 180,
                  backgroundColor:
                    selectedReason === item.value ? "#C2E7F7" : "#F0F0F0",
                  borderRadius: 10,

                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.reasons}>
          <Text style={{ fontWeight: 700, marginBottom: 20 }}>Animal :</Text>
          <FlatList
            horizontal={true}
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              padding: (5, 15),
              borderRadius: 15,
            }}
            keyExtractor={(item) => item._id}
            data={pet}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlePressAnimal(item._id)}
                style={{
                  marginLeft: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 180,
                  backgroundColor:
                    selectedPet === item._id ? "#C2E7F7" : "#F0F0F0",
                  borderRadius: 10,
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ width: "70%", alignItems: "center" }}>
          <Text style={{ fontWeight: 700 }}>
            Est-ce votre premier rendez-vous ?
          </Text>
          <View style={styles.checkboxContainer}>
            <RadioGroup
              radioButtons={RadioButtons}
              onPress={setIsFirstRdv}
              selectedId={isFirstRdv}
              layout="row"
              containerStyle={{
                width: "70%",
                justifyContent: "space-between",
                borderRadius: 10,
                borderColor: "lightgray",
                padding: (5, 10),
              }}
            />
          </View>
        </View>
        <View style={{ width: "70%", alignItems: "center" }}>
          <Text style={{ fontWeight: 700 }}>S'agit-il de votre animal ?</Text>
          <View style={styles.checkboxContainer}>
            <RadioGroup
              radioButtons={RadioButtons}
              onPress={setIsMyAnimal}
              selectedId={isMyAnimal}
              layout="row"
              containerStyle={{
                width: "70%",
                justifyContent: "space-between",
                borderRadius: 10,
                borderColor: "lightgray",
                padding: (5, 10),
              }}
            />
          </View>
        </View>


        {user.token ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            {errorReason && <Text style={{ color: 'red' }}>{errorReason}</Text>}
            <TouchableOpacity
              onPress={() => handleBookRdvkClick()}
              style={styles.takeRdvButton}
            >
              <Text style={{ fontWeight: 700, color: "white" }}>Prendre RDV</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              height: 85,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
    justifyContent: "space-around",
  },

  coordonnees: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D2C56",
    padding: 10,
    width: "90%",
    justifyContent: "space-around",
    borderRadius: 10,
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

  name: {
    color: "#ffff",
    fontSize: 20,
    fontWeight: 700,
  },

  occupation: {
    color: "#ffff",
    fontSize: 16,
  },

  address: {
    flexDirection: "row",
    textAlign: "center",
    color: "#ffff",
    fontSize: 16,
    justifyContent: "center",
  },

  reasons: {
    // padding: 10,
    height: 120,
    // marginTop: 20,
    width: "70%",
    alignItems: "center",
  },

  takeRdvButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },

  SignInUpButtons: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonStyle: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
  },
});
