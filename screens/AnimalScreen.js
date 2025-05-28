import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { useEffect, useState } from "react";

export default function AnimalScreen() {

  // const petId = "6835dc0d606dbedcf1aa35af";
  const [petId, setPetId] = useState("");
  const [animalData, setAnimalData] = useState([]);
  const [newAnimalInput, setNewAnimalInput] = useState(false);
  const [animalTopIsVisible, setAnimalTopIsVisible] = useState(false);

  // Hooks used in the POST
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newBirth, setNewBirth] = useState("");
  const [newRace, setNewRace] = useState("");
  const [newSexe, setNewSexe] = useState("");
  const [newIdentification, setNewIdentification] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newType, setNewType] = useState("");
  const [newDocument, setNewDocument] = useState([]);


  const addAnimal = () => {
    setNewAnimalInput(true);
  };

  const handleSendData = () => {
    setNewAnimalInput(false);
    Alert.alert("Animal ajouté !");

    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "animalInfo": { newName, newAge, newBirth, newType, newRace, newSexe, newIdentification, newWeight, newDocument }
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?._id) {
          setPetId(data.data._id);
          setAnimalTopIsVisible(true);
        }
      });
  };

  // Ce useEffect déclenche une requête GET dès que petId change
  useEffect(() => {
    if (!petId) return;

    const fetchData = async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/" + petId);
      const data = await response.json();
      setAnimalData(data.petInfo);
    };

    fetchData();
  }, [petId]);

  return (
    <View style={styles.mainDiv}>

      {/* Header Part */}
      {animalData?.name && (
        <View style={styles.header}>
          <View style={styles.topHeader} >
            <View style={styles.topHeaderTitle}>
              <Text style={styles.title}>Mes animaux</Text>
            </View>
          </View>
          <View style={[styles.bottomHeader, { display: animalTopIsVisible ? 'flex' : 'none' }]}>
            <View style={styles.bottomHeaderProfile}>
              <View style={styles.bottomHeaderInformationContainer}>
                <View style={styles.bottomHeaderPictureProfile}>
                  <Image source={require('../assets/dogImg.png')} style={styles.animalImg} />
                </View>
                <View style={styles.bottomHeaderInformation}>
                  <View style={styles.bottomHeaderInformationName}>
                    <Text style={styles.animalName}>{animalData?.name}</Text>
                  </View>
                  <View style={styles.bottomHeaderInformationGeneral}>
                    <View style={styles.bottomHeaderInformationBirth}>
                      <Text style={styles.animalBirth}>{animalData?.age} ans, né le {animalData?.dateOfBirth}</Text>
                    </View>
                    <View style={styles.bottomHeaderInformationRace}>
                      <Text style={styles.animalRace}>{animalData?.breed}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {/* Body Part  */}
      <View style={styles.body}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnAddAnimal} onPress={() => addAnimal()}>
            <Text style={styles.btnAddAnimalTxt}>Ajouter un animal</Text>
          </TouchableOpacity>
        </View>


        {/* Add Animal Part */}
        <View style={[styles.containerNewAnimal, { display: newAnimalInput ? 'flex' : 'none' }]}>
          <Text style={styles.titleNewAnimal}>🦁 Animal</Text>
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
            <TextInput placeholder="Type" placeholderTextColor="white" style={styles.color} value={newType} onChangeText={setNewType} />
          </View>
          <View style={styles.sendData}>
            <TouchableOpacity style={styles.sendDataBtn} onPress={handleSendData}>
              <Text style={styles.sendDataTxt}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    fontFamily: 'Arial, Sans-Serif',
    backgroundColor: "white"
  },
  header: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topHeader: {
    height: "40%",
    width: "100%",
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center',
    gap: 23
  },
  topHeaderTitle: {
    height: "40%",
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1472AE",
  },
  topHeaderIcon: {
    height: "40%",
    justifyContent: 'flex-end'
  },
  modifyingIcon: {
    color: "#1472AE"
  },
  bottomHeader: {
    marginTop: 25,
    height: "60%",
    width: "100%",
    alignItems: 'center'
  },
  bottomHeaderProfile: {
    height: "100%",
    width: "90%",
    justifyContent: 'center'
  },
  bottomHeaderInformationContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHeaderPictureProfile: {
    height: "75%",
    width: "30%",
    borderRightWidth: 1,
    borderRightColor: 'white',
    alignItems: 'center',
  },
  animalImg: {
    height: '90%',
    width: '80%',
    borderRadius: 50
  },
  bottomHeaderInformation: {
    height: '75%',
    width: '60%',
  },
  bottomHeaderInformationName: {
    height: "40%",
    width: "100%",
  },
  animalName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 35
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
    marginLeft: 35
  },
  bottomHeaderInformationRace: {
    height: "50%",
    width: "100%",
  },
  animalRace: {
    color: "white",
    fontSize: 16,
    marginLeft: 35
  },

  // BODY PART

  body: {
    height: '70%',
    alignItems: 'center',
  },
  btnContainer: {
    width: "45%",
    marginTop: 300,
  },
  btnAddAnimal: {
    padding: 12,
    backgroundColor: "#0C2D56",
    borderRadius: 10
  },
  btnAddAnimalTxt: {
    textAlign: 'center',
    color: "white",
    fontSize: 16,
    fontWeight: 600
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
    fontWeight: 600
  },
  nameAndAge: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  name: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  age: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  birthAndRace: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  birth: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  race: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  sexeAndIdentification: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  sexe: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  identification: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
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
    color: "white"
  },
  color: {
    width: "40%",
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  sendData: {
    marginTop: 45,
    height: "12%",
    width: "36%",
    alignSelf: "center"
  },
  sendDataBtn: {
    justifyContent: 'center',
    backgroundColor: "#0C2D56",
    borderRadius: 10,
    height: '100%'
  },
  sendDataTxt: {
    textAlign: 'center',
    color: "white"
  },

})