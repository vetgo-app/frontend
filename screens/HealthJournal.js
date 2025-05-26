import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from 'expo-document-picker';

export default function HealthJournal() {
    const modifyIcon = <FontAwesome name={"pencil-square-o"} size={32} style={styles.modifyingIcon} />;
    const [animalInformation, setAnimalInformation] = useState([]);

    useEffect(() => {

        const fetchedData = async () => {

            const response = await fetch("http://192.168.100.47:3000/healthJournal");
            const data = await response.json();

            setAnimalInformation(data.animalInformations[0])
        }
        fetchedData();
    }, []);

    // dataInformation's variables
    const dataInformation = [
        { label: `Sexe : ${animalInformation.sexe}`, value: `${animalInformation.sexe}` },
        { label: `Identification: ${animalInformation.identification}`, value: `${animalInformation.identification}` },
        { label: `Poids : ${animalInformation.weight}`, value: `${animalInformation.weight}` },
    ];

    // dataDoucments' variables
    const adoptionCertificate = "Contrat d'adoption (17/01/24)";

    const dataDocuments = [
        { label: `${adoptionCertificate}` }
    ];

    const handleAddDocuments = () => {
        const selecDoc = async () => {
            const formData = new FormData();

            const doc = await DocumentPicker.getDocumentAsync();

            if (doc.canceled) {
                Alert.alert("Chargement du document annulé !")
            } else {
                Alert.alert("Document correctement chargé !")
            }

            formData.append('animalNewDocument', {
                uri: doc.assets[0].uri,
                name: 'animalDocument.pdf',
                type: 'application/pdf',
            });

            fetch('http://192.168.100.47:3000/healthJournal', {
                method: 'POST',
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("après le fetch => ")
                console.log(data)
            });

        }

        selecDoc()
        // Alert.alert("Document ajouté !")
    }

    return (
        <View style={styles.mainDiv}>

            {/* Header Part */}
            <View style={styles.header}>
                <View style={styles.topHeader}>
                    <View style={styles.topHeaderTitle}>
                        <Text style={styles.title}>Carnet de Santé de</Text>
                    </View>
                    <View style={styles.topHeaderIcon}>
                        {modifyIcon}
                    </View>
                </View>
                <View style={styles.bottomHeader}>
                    <View style={styles.bottomHeaderProfile}>
                        <View style={styles.bottomHeaderInformationContainer}>
                            <View style={styles.bottomHeaderPictureProfile}>
                                <Image source={require('../assets/dogImg.png')} style={styles.animalImg} />
                            </View>
                            <View style={styles.bottomHeaderInformation}>
                                <View style={styles.bottomHeaderInformationName}>
                                    <Text style={styles.animalName}>{animalInformation.name}</Text>
                                </View>
                                <View style={styles.bottomHeaderInformationGeneral}>
                                    <View style={styles.bottomHeaderInformationBirth}>
                                        <Text style={styles.animalBirth}>{animalInformation.age} ans, né le {animalInformation.dateOfBirth}</Text>
                                    </View>
                                    <View style={styles.bottomHeaderInformationRace}>
                                        <Text style={styles.animalRace}>{animalInformation.race}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Body Part */}
            <View style={styles.body}>

                {/* Informations Container */}
                <View style={styles.bodyInformationContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        itemTextStyle={styles.itemTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataInformation}
                        labelField="label"
                        valueField="value"
                        placeholder="Information de l'animal"
                        itemContainerStyle={styles.itemContainerStyles}
                        containerStyle={styles.containerStyles}
                    />
                </View>

                {/* Documents Container */}
                <View style={styles.bodyDocumentContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        itemTextStyle={styles.itemTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataDocuments}
                        labelField="label"
                        valueField="label"
                        value="null"
                        placeholder="Documents"
                    />
                </View>
                {/* Added documents */}
                <View style={styles.addDocumentContainer}>
                    <TouchableOpacity style={styles.addDocumentBtn} onPress={() => handleAddDocuments()}>
                        <Text style={styles.addDocumentBtnTxt}>Ajouter un document</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        fontFamily: 'Arial, Sans-Serif',
        backgroundColor: "white"
    },

    // HEADER PART

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
    itemContainerStyles: {
        borderRadius: 10
    },
    containerStyles: {
        // fontFamily: 'Arial',
        // fontSize: 16,
    },
    itemTextStyle: {
        fontFamily: 'Arial',
        fontSize: 16,
        color: "#1472AE",
        fontWeight: 800,
    },

    // BODY PART

    body: {
        height: '70%',
        marginTop: 45,
    },

    // Drop Down
    dropdown: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        width: '80%',
        borderRadius: 10
    },
    placeholderStyle: {
        fontSize: 16,
        // color: "#1472AE",
        fontWeight: 600,
    },

    bodyInformationContainer: {
        height: "15%",
        marginTop: 20,
        alignItems: 'center',
    },
    bodyDocumentContainer: {
        height: "15%",
        alignItems: 'center',
    },
    bodyInformationVaccination: {
        height: "15%",
        alignItems: 'center',
    },
    bodyHealthHistoryContainer: {
        height: "15%",
        alignItems: 'center',
    },
    addDocumentContainer: {
        height: "15%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    addDocumentBtn: {
        backgroundColor: "#0C2D56",
        padding: 15,
        width: '80%',
        borderRadius: 10
    },
    addDocumentBtnTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: 700,
        textAlign: 'center'
    },
})