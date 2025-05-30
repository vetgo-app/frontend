import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import { useIsFocused } from "@react-navigation/native";

export default function AnimalScreen({ navigation }) {

  // Making the Refetch when navigate through screens
  const isFocused = useIsFocused()
  
  // Initialize the useSelector
  const user = useSelector((state) => state.user.value);

  // Get the user's information
  const token = user.token;

  // Display modal
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = useState(false);

  // Display animal card
  const [newAnimalInput, setNewAnimalInput] = useState(false);
  const [animalTopIsVisible, setAnimalTopIsVisible] = useState(false);

  // Fetch's information
  const [animalData, setAnimalData] = useState([]);
  
  // Hooks used in the POST
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newBirth, setNewBirth] = useState("");
  const [newRace, setNewRace] = useState("");
  const [newSexe, setNewSexe] = useState("");
  const [newIdentification, setNewIdentification] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newType, setNewType] = useState("");

  // Used to add an empty array to add documents
  const [newDocument, setNewDocument] = useState([]);

  // Animal's ObjectId
  const [petId, setPetId] = useState("");

  const addAnimal = () => {
    setNewAnimalInput(true);
  };

  // Send the data to DB and display the added animal
  const handleSendData = () => {
    setNewAnimalInput(false);

    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        animalInfo: { newName, newAge, newBirth, newType, newRace, newSexe, newIdentification, newWeight, newDocument, token },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?._id) {
          setPetId(data.data._id);
          setAnimalTopIsVisible(true);
        }
        navigation.navigate("HealthJournal", { petId: data.data._id })
      });
  };

  // Triggers a GET request when petId changes
  useEffect(() => {
    if (!petId) return;

    const fetchData = async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/byPet/" + petId);

      const data = await response.json();

      setAnimalData(data.petInfo);
    };

    fetchData();
  }, [petId, isFocused]);

  // Navigation to the Journal when press to the Animal
  const navigationToJournal = () => {
    navigation.navigate("HealthJournal", { petId })
  }

  // In the connection, if the user has a pet, it's showned
  useEffect(() => {
    if (!token) {
      setAnimalData([]);
      setPetId("");
      return 
    }

    const fetchUserAnimals = async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/byOwner/" + token);
      const result = await response.json();

      if (result?.result && result.pets.length > 0) {
        // Display the first animal
        setAnimalData(result.pets[0]);
        setPetId(result.pets[0]._id);
        setAnimalTopIsVisible(true);
      } else {
        // If not pet, display the Add
        setAnimalTopIsVisible(false);
        setPetId("");
      }
    };

    fetchUserAnimals();
  }, [token, isFocused]);

  return (
    // Connection's modal
    <View style={styles.mainDiv}>
      <Modal visible={modalSignInVisible} animationType="none">
        <SignIn setModalSignInVisible={setModalSignInVisible} modalSignInVisible={modalSignInVisible} navigation={navigation} />
      </Modal>
      <Modal visible={modalSignUpVisible} animationType="none">
        <SignUp setModalSignUpVisible={setModalSignUpVisible} modalSignUpVisible={modalSignUpVisible} navigation={navigation} />
      </Modal>

      {/* SignIn / SignUp Button */}
      <View style={styles.SignInUpButtons}>
        {!user.token && (
          <TouchableOpacity onPress={() => setModalSignInVisible(true)} style={styles.buttonStyle} >
            <Text style={{ fontWeight: 700, color: "#fff" }}>Se connecter</Text>
          </TouchableOpacity>
        )}
        {!user.token && (
          <TouchableOpacity onPress={() => setModalSignUpVisible(true)} style={styles.buttonStyle} >
            <Text style={{ fontWeight: 700, color: "#fff" }}>S'inscrire</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Header Part */}
      <View style={styles.header}>
        {animalData?.name && (
          <View style={styles.topHeader}>
            <View style={styles.topHeaderTitle}>
              <Text style={styles.title}>Mes animaux</Text>
            </View>
          </View>
        )}

        {(animalTopIsVisible && animalData?.name) && (
          <TouchableOpacity style={styles.bottomHeaderBtn} onPress={() => navigationToJournal()} >
            <View style={styles.bottomHeader}>
              <View style={styles.bottomHeaderProfile}>
                <View style={styles.bottomHeaderInformationContainer}>
                  <View style={styles.bottomHeaderPictureProfile}>
                    <Image source={require("../assets/dogImg.png")} style={styles.animalImg} />
                  </View>
                  <View style={styles.bottomHeaderInformation}>
                    <View style={styles.bottomHeaderInformationName}>
                      <Text style={styles.animalName}>{animalData?.name}</Text>
                    </View>
                    <View style={styles.bottomHeaderInformationGeneral}>
                      <View style={styles.bottomHeaderInformationBirth}>
                        <Text style={styles.animalBirth}>
                          {animalData?.age} ans, né le {animalData?.dateOfBirth}
                        </Text>
                      </View>
                      <View style={styles.bottomHeaderInformationRace}>
                        <Text style={styles.animalRace}>{animalData?.breed}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Part  */}
      <View style={styles.body}>
        {user.token && (
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnAddAnimal} onPress={() => addAnimal()} >
              <Text style={styles.btnAddAnimalTxt}>Nouvel animal</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Add Animal Part */}
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 150, alignItems: "center" }} keyboardShouldPersistTaps="handled" >
            <View style={[styles.containerNewAnimal, { display: newAnimalInput ? "flex" : "none" },]}>
              <Text style={styles.titleNewAnimal}>Animal</Text>
              <View style={styles.nameAndAge}>
                <TextInput placeholder="Nom" placeholderTextColor="white" style={styles.name} value={newName} onChangeText={setNewName} />
                <TextInput placeholder="Age" placeholderTextColor="white" style={styles.age} value={newAge} onChangeText={setNewAge} />
              </View>
              <View style={styles.birthAndRace}>
                <TextInput placeholder="Date de naissance" placeholderTextColor="white" style={styles.birth} value={newBirth} onChangeText={setNewBirth} />
                <TextInput placeholder="Race" placeholderTextColor="white" style={styles.race} value={newRace} onChangeText={setNewRace} />
              </View>
              <View style={styles.sexeAndIdentification}>
                <TextInput placeholder="Sexe" placeholderTextColor="white" style={styles.sexe} value={newSexe} onChangeText={setNewSexe} />
                <TextInput placeholder="Identification" placeholderTextColor="white" style={styles.identification} value={newIdentification} onChangeText={setNewIdentification} />
              </View>
              <View style={styles.weightAndColor}>
                <TextInput placeholder="Poids" placeholderTextColor="white" style={styles.weight} value={newWeight} onChangeText={setNewWeight} />
                <TextInput placeholder="Espèce" placeholderTextColor="white" style={styles.color} value={newType} onChangeText={setNewType} />
              </View>

              {/* Add animal to mongoDB */}
              {user.token && (
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.btnAddAnimal} onPress={() => handleSendData()} >
                    <Text style={styles.btnAddAnimalTxt}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    fontFamily: "Arial",
    backgroundColor: "white",
  },
  header: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  topHeader: {
    height: "40%",
    width: "100%",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "center",
    gap: 23,
  },
  topHeaderTitle: {
    height: "40%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1472AE",
    marginTop: 10
  },
  topHeaderIcon: {
    height: "40%",
    justifyContent: "flex-end",
  },
  modifyingIcon: {
    color: "#1472AE",
  },
  bottomHeaderBtn: {
    height: "80%"
  },
  bottomHeader: {
    marginTop: 25,
    height: "60%",
    width: "100%",
    alignItems: "center",
  },
  bottomHeaderProfile: {
    height: "100%",
    width: "90%",
    justifyContent: "center",
  },
  bottomHeaderInformationContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHeaderPictureProfile: {
    height: "75%",
    width: "30%",
    borderRightWidth: 1,
    borderRightColor: "white",
    alignItems: "center",
  },
  animalImg: {
    height: "90%",
    width: "66%",
    borderRadius: 50,
  },
  bottomHeaderInformation: {
    height: "75%",
    width: "60%",
  },
  bottomHeaderInformationName: {
    height: "40%",
    width: "100%",
  },
  animalName: {
    color: "white",
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 35,
  },
  bottomHeaderInformationGeneral: {
    height: "60%",
    width: "100%",
  },
  bottomHeaderInformationBirth: {
    height: "50%",
    width: "100%",
  },
  animalBirth: {
    color: "white",
    fontSize: 16,
    marginLeft: 35,
  },
  bottomHeaderInformationRace: {
    height: "50%",
    width: "100%",
  },
  animalRace: {
    color: "white",
    fontSize: 16,
    marginLeft: 35,
  },

  // BODY PART

  body: {
    height: "70%",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  btnAddAnimal: {
    padding: 12,
    backgroundColor: "#0C2D56",
    borderRadius: 10,
  },
  btnAddAnimalTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },

  // Add animal container
  containerNewAnimal: {
    width: "90%",
    marginTop: 100,
    gap: 20,
  },
  titleNewAnimal: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 600,
  },
  nameAndAge: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  age: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  birthAndRace: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  birth: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  race: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  sexeAndIdentification: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sexe: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  identification: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  weightAndColor: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  weight: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  color: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  sendData: {
    marginTop: 45,
    height: "12%",
    width: "36%",
    alignSelf: "center",
  },
  sendDataBtn: {
    justifyContent: "center",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    height: "100%",
  },
  sendDataTxt: {
    textAlign: "center",
    color: "white",
  },
  SignInUpButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    marginTop: 300,
  },
  container: {
    alignItems: 'center',
  },
});
