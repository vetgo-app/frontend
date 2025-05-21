import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

export default function ProfileProScreen() {
  const [isSelectedL, setSelectionL] = useState(false);
  const [isSelectedM, setSelectionM] = useState(false);
  const [isSelectedMe, setSelectionMe] = useState(false);
  const [isSelectedJ, setSelectionJ] = useState(false);
  const [isSelectedV, setSelectionV] = useState(false);
  const [isSelectedS, setSelectionS] = useState(false);
  const [isSelectedD, setSelectionD] = useState(false);

  const [isSelectedDom, setSelectionDom] = useState(false);
  const [isSelectedVisio, setSelectionVisio] = useState(false);
  const [isSelectedUrgence, setSelectionUrgence] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [price, setPrice] = useState("");

  const [specialization, setSpecialization] = useState("");
  const [occupation, setOccupation] = useState("");

  fetch("http://192.168.100.110:3000/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("route user:", data.data[0].name);
    });

  const handleSubmit = () => {
    fetch("http://192.168.100.110:3000/store/addStore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialization,
        occupation,
        address,
        price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("message :", data);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.image}
            source={require("../assets/favicon.png")}
          />
          <Text>Mon profil</Text>
        </View>

        <View style={styles.name}>
          <Text>Valérie</Text>
          <Text>Veto</Text>
        </View>
        <View style={styles.email}>
          <Text style={styles.emailText}>valerie.veto@mail.fr</Text>
        </View>

        <View style={styles.input}>
          <RNPickerSelect
            placeholder={{ label: "Profession", value: null }} // valeur par defaut du placeholder
            onValueChange={(value) => setOccupation(value)}
            items={[
              { label: "vétérinaire", value: "Vétérinaire" },
              { label: "ostéopathe", value: "Ostéopathe" },
              { label: "toiletteur", value: "Toiletteur" },
              { label: "éducateur", value: "Educateur" },
              { label: "physiothérapeute", value: "Physiothérapeute" },
            ]}
          />
          <RNPickerSelect
            placeholder={{ label: "Spécialisation", value: null }} // valeur par defaut du placeholder
            onValueChange={(value) => setSpecialization(value)}
            items={[
              { label: "chien", value: "chien" },
              { label: "chat", value: "chat" },
              { label: "cheval", value: "cheval" },
              { label: "rongeur", value: "rongeur" },
              { label: "oiseaux", value: "oiseaux" },
              { label: "bovin", value: "bovin" },
            ]}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Adresse"
            onChangeText={(value) => setAddress(value)}
            value={address}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Ville"
            onChangeText={(value) => setCity(value)}
            value={city}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Code postal"
            onChangeText={(value) => setZipCode(value)}
            value={zipCode}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tarif consultatinon"
            onChangeText={(value) => setPrice(value)}
            value={price}
          />
        </View>
        <View style={styles.consultation}>
          <Text style={styles.consultationText}>Jour de consultation</Text>
          <View style={styles.box}>
            <View style={styles.firstCheckbox}>
              <Checkbox
                value={isSelectedL}
                onValueChange={setSelectionL}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Lundi</Text>
              <Checkbox
                value={isSelectedM}
                onValueChange={setSelectionM}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Mardi</Text>
              <Checkbox
                value={isSelectedMe}
                onValueChange={setSelectionMe}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Mercredi</Text>
            </View>
            <View style={styles.lastCheckbox}>
              <Checkbox
                value={isSelectedJ}
                onValueChange={setSelectionJ}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Jeudi</Text>
              <Checkbox
                value={isSelectedV}
                onValueChange={setSelectionV}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Vendredi</Text>
              <Checkbox
                value={isSelectedS}
                onValueChange={setSelectionS}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Samedi</Text>
            </View>
          </View>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Options</Text>
          <View style={styles.optionBox}>
            <Checkbox
              value={isSelectedDom}
              onValueChange={setSelectionDom}
              style={styles.checkbox}
            />
            <Text style={styles.label}>A domicile</Text>
            <Checkbox
              value={isSelectedVisio}
              onValueChange={setSelectionVisio}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Visio</Text>
            <Checkbox
              value={isSelectedUrgence}
              onValueChange={setSelectionUrgence}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Urgences</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Valider les modifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E7F7",
    overflow: "scroll",
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },

  image: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 250,
  },

  name: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  emailText: {
    backgroundColor: "white",
    textAlignVertical: "center",
    height: "40",
    fontSize: 16,
    marginTop: 20,
    width: "80%",
    padding: "20px",
    borderWidth: 1,
    borderColor: "#3884BB",
    textAlign: "center",
    borderRadius: 10,
  },

  input: {
    width: "100%",
    alignItems: "center",
  },

  textInput: {
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    width: "80%",
    height: "40",
    margin: 10,
  },

  consultationText: {
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },

  box: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  optionText: {
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },

  optionBox: {
    backgroundColor: "red",
    width:'80%',
    flexDirection: "row",
    alignItems:'center',
    height: 40,
  },

  checkbox: {
    borderRadius: 5,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
