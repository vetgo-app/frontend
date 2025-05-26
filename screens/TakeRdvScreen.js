import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import React, { useState, useMemo } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";

const data = [
  { value: "Soins préventifs", label: "Soins préventifs" },
  { value: "Maladies et urgences", label: "Maladies et urgences" },
  { value: "Suivi et soins spécifiques", label: "Suivi et soins spécifiques" },
];

export default function TakeRdvScreen({ navigation }) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [isSelectedReason, setIsSelectedReason] = useState(false);
  const [isFirstRdv, setIsFirstRdv] = useState();
  const [isMyAnimal, setIsMyAnimal] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  console.log("isFirstRdv", isFirstRdv);
  console.log("isMyAnimal", isMyAnimal);

  const handlePressReason = (value) => {
    setSelectedReason(value);
    setIsSelectedReason(!isSelectedReason);
    console.log("value", value);
  };

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
    if (!user.token) {
      return navigation.navigate("SignIn");
    }
    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/canBookRdv/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("RdvConfirmationScreen");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome
          name="arrow-left"
          size={15}
          color="#1472AE"
          style={{ color: "#1472AE", marginLeft: 30 }}
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
        <View style={styles.proContainer}>
          <Image
            source={require("../assets/doctorPicture.jpg")}
            style={styles.image}
          />
          <View style={styles.proInfo}>
            <Text style={styles.text}>Isabelle Artas</Text>
            <Text style={styles.text}>Vétérinaire</Text>
          </View>
        </View>
        <Text style={styles.selectReason}>Selectionner un motif</Text>
        <View style={styles.reasons}>
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
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
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
              width: "50%",
              justifyContent: "space-between",
              borderRadius: 10,
              borderColor: "lightgray",
              padding: (5, 10),
            }}
          />
        </View>
        <Text style={{ fontWeight: 700 }}>S'agit-il de votre animal ?</Text>
        <View style={styles.checkboxContainer}>
          <RadioGroup
            radioButtons={RadioButtons}
            onPress={setIsMyAnimal}
            selectedId={isMyAnimal}
            layout="row"
            containerStyle={{
              width: "50%",
              justifyContent: "space-between",
              borderRadius: 10,
              borderColor: "lightgray",
              padding: (5, 10),
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleBookRdvkClick()}
          style={styles.takeRdvButton}
        >
          <Text style={{ fontWeight: 700, color: "white" }}>Prendre RDV</Text>
        </TouchableOpacity>
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
    height: "13%",
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
    height: "87%",
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  proContainer: {
    padding: 15,
    width: "80%",
    height: 125,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: "30%",
    height: "100%",
    borderRadius: 50,
  },

  proInfo: {
    width: "60%",
    height: "90%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  text: {
    color: "#ffff",
    fontSize: 20,
  },

  selectReason: {
    flexDirection: "row",
    textAlign: "center",
    width: "80%",
    fontWeight: 700,
  },

  reasons: {
    // padding: 10,
    height: 60,
    // marginTop: 20,
    marginBottom: 20,
    width: "70%",
  },

  takeRdvButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
