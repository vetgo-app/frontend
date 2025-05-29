import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from 'expo-document-picker';

export default function HealthJournal({ route }) {
    const modifyIcon = <FontAwesome name={"pencil-square-o"} size={32} style={styles.modifyingIcon} />;
    // Geting the petID from the AnimalScreen
    const { petId } = route.params;

    // Container of the pet's information
    const [petInfo, setPetInfo] = useState(null);

    // Container of the futur document's name
    const [documentName, setDocumentName] = useState("")

    // Making the components visible / hidden
    const [modalVisible, setModalVisible] = useState(false)
    const [previsualisationModalVisible, setPrevisualisationModalVisible] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState(null)

    // Getting the data of the pet from mongoDB
    const fetchData = async () => {
        const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/petDocuments/byPet/" + petId);
        const data = await response.json();

        if (data.result) {
            setPetInfo(data.petInfo)
        } else {
            Alert.alert(data.error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // dataInformation's variables
    const dataInformation = [
        { label: `Sexe : ${petInfo?.sexe}`, value: `${petInfo?.sexe}` },
        { label: `Identification: ${petInfo?.identification}`, value: `${petInfo?.identification}` },
        { label: `Poids : ${petInfo?.weight}`, value: `${petInfo?.weight}` },
    ];

    // Initialize an empty array if there is no document for the pet
    const dataDocuments = petInfo?.documents.map((e) => {
        return { label: `Nom : ${e.docName}`, value: `${e.file}` }
    }) || []

    // Getting the document from the phone and send it to BE
    const handleAddDocuments = async (docName) => {
        const doc = await DocumentPicker.getDocumentAsync({ type: ["application/pdf"] });

        if (doc.canceled) {
            Alert.alert("Chargement du document annulé !")
            return;
        }

        const formData = new FormData();

        formData.append('animalNewDocument', {
            uri: doc.assets[0].uri,
            name: `${docName}.pdf`,
            type: 'application/pdf',
        });

        const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + '/petDocuments/' + petId, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()

        if (data.result) {
            setDocumentName("")
            setModalVisible(false)
            fetchData()
            Alert.alert("Document chargé avec succès !")
        }
    }

    return (
        <View style={styles.mainDiv}>
            <Modal visible={modalVisible} animationType="fade">
                <View style={styles.informationContainer}>
                    <TextInput
                        style={styles.inpuText}
                        placeholder="Nommez votre document"
                        onChangeText={(value) => setDocumentName(value)}
                        value={documentName}
                    />
                    <View style={{ flexDirection: "row", columnGap: 20 }}>
                        <TouchableOpacity style={styles.searchBtn} onPress={() => {
                            setDocumentName("")
                            setModalVisible(false)
                        }}>
                            <Text style={styles.searchBtnTxt}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchBtn} onPress={() => documentName.length > 0 && handleAddDocuments(documentName)}>
                            <Text style={styles.searchBtnTxt}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            {selectedDoc && <Modal visible={previsualisationModalVisible} animationType="fade">
                <View style={styles.informationContainer}>
                    <Image source={{ uri: selectedDoc }} style={styles.docImg} />
                    <View style={{ flexDirection: "row", columnGap: 20, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={styles.searchBtn} onPress={() => {
                            setSelectedDoc(null)
                            setPrevisualisationModalVisible(false)
                        }}>
                            <Text style={styles.searchBtnTxt}>Annuler</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>}

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
                                    <Text style={styles.animalName}>{petInfo?.name}</Text>
                                </View>
                                <View style={styles.bottomHeaderInformationGeneral}>
                                    <View style={styles.bottomHeaderInformationBirth}>
                                        <Text style={styles.animalBirth}>{petInfo?.age} ans, né le {petInfo?.dateOfBirth}</Text>
                                    </View>
                                    <View style={styles.bottomHeaderInformationRace}>
                                        <Text style={styles.animalRace}>{petInfo?.breed}</Text>
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
                        valueField="value"
                        onChange={(doc) => {
                            setSelectedDoc(doc.value)
                            setPrevisualisationModalVisible(true)
                        }}
                        placeholder="Documents de l'animal"
                    />
                </View>
                {/* Added documents */}
                <View style={styles.addDocumentContainer}>
                    <TouchableOpacity style={styles.addDocumentBtn} onPress={() => setModalVisible(true)}>
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
    docImg: {
        width: "100%",
        height: "80%",
        objectFit: "contain"
    },

    // HEADER PART
    informationContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20
    },
    inpuText: {
        backgroundColor: "white",
        height: 50,
        width: "87%",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3884BB",
        textAlign: "center",
    },
    searchBtn: {
        borderWidth: 1,
        height: 50,
        width: 150,
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