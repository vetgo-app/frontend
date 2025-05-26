import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

export default function FaqScreen() {
  // Text in the Input
  const [word, setWord] = useState("");

  // Initialization of the regex
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapeRegex(word), "i");

  // Fetch the value of the backend
  const [originalFAQ, setOriginalFAQ] = useState([]);
  const [filteredFAQ, setFilteredFAQ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.100.47:3000/faq");
      const data = await response.json();

      setOriginalFAQ(data.FAQ);
      setFilteredFAQ(data.FAQ);
    };
    fetchData();
  }, []);

  // Filter the questions
  const handlePress = () => {
    const filteredDropdownContainer = originalFAQ.filter((element) =>
      regex.test(element.question)
    );
    setFilteredFAQ(filteredDropdownContainer);
  };

  const dropdownContainer = filteredFAQ.map((element, index) => {
    return (
      <Dropdown
        key={index}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={[{ label: element.answer, value: element.question }]}
        labelField="label"
        valueField="value"
        value={"null"}
        placeholder={element.question}
        itemContainerStyle={styles.itemContainerStyles}
        containerStyle={styles.containerStyles}
        fontFamily={"Arial"}
      />
    );
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>FAQ</Text>
        </View>
        <View style={styles.questionsContainer}>
          <ScrollView style={styles.scroll}>{dropdownContainer}</ScrollView>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.informationContainer}>
          <TextInput
            style={styles.inpuText}
            placeholder="Que recherchez-vous ?"
            onChangeText={(value) => setWord(value)}
            value={word}
          ></TextInput>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handlePress()}
          >
            <Text style={styles.searchBtnTxt}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#C2E7F7",
    alignItems: "center",
    fontFamily: "Arial, Sans-Serif",
  },
  header: {
    height: "75%",
    width: "90%",
  },
  headerTitle: {
    height: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#1472AE",
    fontWeight: 700,
    marginBottom: 20,
  },
  questionsContainer: {
    height: "70%",
  },
  scroll: {},
  cardContainerTxt: {
    fontSize: 16,
  },

  // BODY PART
  body: {
    height: "25%",
    width: "90%",
    alignItems: "center",
  },
  informationContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inpuText: {
    backgroundColor: "white",
    height: "23%",
    width: "87%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3884BB",
    textAlign: "center",
  },
  searchBtn: {
    borderWidth: 1,
    height: "23%",
    width: "87%",
    borderRadius: 10,
  },
  searchBtnTxt: {
    height: "100%",
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    height: 100,
  },
  placeholderStyle: {
    fontSize: 16,
    // color: "#1472AE",
    color: "black",
    // fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 30,
  },
  itemTextStyle: {
    fontSize: 16,
    color: "#1472AE",
    fontWeight: "bold",
  },
  itemContainerStyles: {
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  containerStyles: {
    borderRadius: 10,
    height: "fit-content",
    fontSize: 16,
  },
});
