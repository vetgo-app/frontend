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
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProfileProScreen() {
  const [openProfession, setOpenProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [professionItems, setProfessionItems] = useState([
    { label: "Vétérinaire", value: "Vétérinaire" },
    { label: "Ostéopathe", value: "Ostéopathe" },
    { label: "Toiletteur", value: "Toiletteur" },
    { label: "Educateur", value: "Educateur" },
    { label: "Physiothérapeute", value: "Physiothérapeute" },
  ]);

  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [specializationItems, setSpecializationItems] = useState([
    { label: "Chien", value: "chien" },
    { label: "Chat", value: "chat" },
    { label: "Cheval", value: "cheval" },
    { label: "Rongeur", value: "rongeur" },
    { label: "Oiseaux", value: "oiseaux" },
    { label: "Bovin", value: "bovin" },
  ]);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [price, setPrice] = useState("");

  const [isSelectedL, setSelectionL] = useState(false);
  const [isSelectedM, setSelectionM] = useState(false);
  const [isSelectedMe, setSelectionMe] = useState(false);
  const [isSelectedJ, setSelectionJ] = useState(false);
  const [isSelectedV, setSelectionV] = useState(false);
  const [isSelectedS, setSelectionS] = useState(false);
  const [isSelectedDom, setSelectionDom] = useState(false);
  const [isSelectedVisio, setSelectionVisio] = useState(false);
  const [isSelectedUrgence, setSelectionUrgence] = useState(false);

  const user = useSelector((state) => state.user.value);

  const handleSubmit = () => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/store/addStore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user._id,
        specialization: selectedSpecialization,
        occupation: selectedProfession,
        price,
        address: {
          street,
          city,
          zipCode,
        },
        isSelectedL,
        isSelectedM,
        isSelectedMe,
        isSelectedJ,
        isSelectedV,
        isSelectedS,
        isSelectedDom,
        isSelectedVisio,
        isSelectedUrgence,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStreet(""), setCity(""), alert(data.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.title}>
            <Image
              style={styles.image}
              source={require("../assets/doctorPicture.jpg")}
            />
            <Text style={styles.titleText}>Mon profil</Text>
          </View>

          <View style={styles.nameColumn}>
            <TextInput
              style={styles.nameText}
              placeholder="Prénom"
              value={user.firstname}
            />
            <TextInput
              style={styles.nameText}
              placeholder="Nom"
              value={user.lastname}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={user.email}
              editable={false}
            />

            <DropDownPicker
              open={openProfession}
              value={selectedProfession}
              items={professionItems}
              setOpen={() => {
                setOpenProfession(!openProfession);
                setOpenSpecialization(false);
              }}
              setValue={setSelectedProfession}
              setItems={setProfessionItems}
              placeholder="Profession"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              containerStyle={{ marginBottom: 10 }}
              zIndex={3000}
              zIndexInverse={1000}
              textStyle={{ fontSize: 15, textAlign: "center" }}
            />

            <DropDownPicker
              open={openSpecialization}
              value={selectedSpecialization}
              items={specializationItems}
              setOpen={() => {
                setOpenSpecialization(!openSpecialization);
                setOpenProfession(false);
              }}
              setValue={setSelectedSpecialization}
              setItems={setSpecializationItems}
              placeholder="Spécialisation"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              containerStyle={{ marginBottom: 10 }}
              zIndex={2000}
              zIndexInverse={2000}
              textStyle={{ fontSize: 15, textAlign: "center" }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Adresse"
              onChangeText={setStreet}
              value={street}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Ville"
              onChangeText={setCity}
              value={city}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Code postal"
              onChangeText={setZipCode}
              value={zipCode}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Tarif consultation"
              onChangeText={setPrice}
              value={price}
            />
          </View>

          <View style={styles.consultation}>
            <Text style={styles.consultationText}>Jours de consultation</Text>
            <View style={styles.box}>
              <View>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedL} onValueChange={setSelectionL} style={styles.checkbox} /><Text style={styles.label}>Lundi</Text></View>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedM} onValueChange={setSelectionM} style={styles.checkbox} /><Text style={styles.label}>Mardi</Text></View>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedMe} onValueChange={setSelectionMe} style={styles.checkbox} /><Text style={styles.label}>Mercredi</Text></View>
              </View>
              <View style={styles.rightColumn}>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedJ} onValueChange={setSelectionJ} style={styles.checkbox} /><Text style={styles.label}>Jeudi</Text></View>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedV} onValueChange={setSelectionV} style={styles.checkbox} /><Text style={styles.label}>Vendredi</Text></View>
                <View style={styles.checkboxRow}><Checkbox value={isSelectedS} onValueChange={setSelectionS} style={styles.checkbox} /><Text style={styles.label}>Samedi</Text></View>
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
                value={isSelectedUrgence}
                onValueChange={setSelectionUrgence}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Urgences</Text>
              <Checkbox
                value={isSelectedVisio}
                onValueChange={setSelectionVisio}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Visio</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Valider les modifications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E7F7",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1472AE",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 250,
  },
  nameColumn: {
    alignItems: "center",
  },
  nameText: {
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#3884BB",
    borderRadius: 10,
    textAlign: "center",
    width: "80%",
    marginVertical: 10,
    padding: 10,
  },
  input: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    zIndex: 3000,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#3884BB",
    textAlign: "center",
    width: "80%",
    marginBottom: 10,
    padding: 10,
  },
  dropdown: {
    width: "80%",
    alignSelf: "center",
    borderColor: "#3884BB",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50, //même intervalle que les autres
  },

  dropdownContainer: {
    width: "80%",
    alignSelf: "center",
    borderColor: "#3884BB",
    zIndex: 2000,

  },
  consultation: {
    marginTop: 10,
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
  option: {
    alignItems: "center",
  },
  optionText: {
    width: "80%",
    marginLeft: 35,
    marginBottom: 10,
    fontWeight: "bold",
  },
  optionBox: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5, // coins légèrement arrondis
    borderWidth: 2,
    borderColor: "#3884BB",
    marginRight: 6,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  label: {
    marginRight: 10,

  },

  viewButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0d2c56",
    padding: 10,
    width: "80%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

});