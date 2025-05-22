import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HealthJournal() {
    const modifyIcon = <FontAwesome name={"pencil-square-o"} size={32} style={styles.modifyingIcon} />
    // dataInformation's variables
    const sexeAnimalTxt = "Sexe";
    const sexeAnimal = "Mâle";
    const identificationTxt = "Identification";
    const identification = "n°22175049";
    const Poids = "Poids";
    const PoidsTxt = "35Kg (renseigné le 22/02/2025)"

    const dataInformation = [
        { label: `${sexeAnimalTxt}: ${sexeAnimal}`, value: `${sexeAnimal}` },
        { label: `${identificationTxt}: ${identification}`, value: `${identification}` },
        { label: `${Poids}: ${PoidsTxt}`, value: `${PoidsTxt}` },
    ];

    // dataDoucments' variables
    const adoptionCertificate = "Contrat d'adoption (17/01/24)";

    const dataDocuments = [
        { label: `${adoptionCertificate}` }
    ];

    // dataVaccinations' variables
    const vacinnationCertificate = "Certificat de vaccination (24/12/24)";

    const dataVaccinations = [
        { label: `${vacinnationCertificate}` }
    ];

    // dataHealthHistor's variable
    const rhumatismTrack = "Compte-Rendu Rhumathisme (02/07/25)";

    const dataHealthHistory = [
        { label: `${rhumatismTrack}` }
    ];


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
                                    <Text style={styles.animalName}>Regex</Text>
                                </View>
                                <View style={styles.bottomHeaderInformationGeneral}>
                                    <View style={styles.bottomHeaderInformationBirth}>
                                        <Text style={styles.animalBirth}>6 ans, né le 17/06/19</Text>
                                    </View>
                                    <View style={styles.bottomHeaderInformationRace}>
                                        <Text style={styles.animalRace}>Berger Allemand</Text>
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
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataInformation}
                        labelField="label"
                        valueField="value"
                        placeholder="Information de l'animal"
                    />
                </View>

                {/* Documents Container */}
                <View style={styles.bodyDocumentContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataDocuments}
                        labelField="label"
                        valueField="label"
                        value="null"
                        placeholder="Documents"
                    />
                </View>

                {/* Vaccination Container */}
                <View style={styles.bodyInformationVaccination}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataVaccinations}
                        labelField="label"
                        valueField="label"
                        value="null"
                        placeholder="Vaccination"
                    />
                </View>

                <View style={styles.bodyHealthHistoryContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={dataHealthHistory}
                        labelField="label"
                        valueField="label"
                        value="null"
                        placeholder="Antécédents médicaux"
                    />
                </View>




                {/* <View style={styles.bodyInformationCard}>
                    <View style={styles.bodyInformationContainer}>
                        <View style={styles.bodyInformationTitle}>
                            <Text style={styles.bodyInformationTitleTxt}>Informations de l'animal</Text>
                        </View>
                    </View>
                    <View style={styles.bodyInformationGeneral}>
                        <View style={styles.bodyInformationGender}></View>
                        <View style={styles.bodyInformationIdentification}></View>
                        <View style={styles.bodyInformationWeight}></View>
                    </View>
                </View> */}

                {/* Document Container */}
                {/* <View style={styles.bodyDocumentContainer}>
                    <View style={styles.bodyDocumentContainerTitle}>
                        <Text style={styles.bodyDocumentTitleTxt}>Documents</Text>
                    </View>
                    <View style={styles.bodyDocumentContainerInformation}>
                        <Text style={styles.bodyDocumentInformationTxt}>
                            Contrat d'adoption (17/01/24)
                        </Text>
                    </View>
                </View> */}

                {/* Vaccination Container */}
                {/* <View style={styles.bodyInformationVaccination}>
                    <View style={styles.bodyInformationVaccinationTitle}>
                        <Text style={styles.bodyInformationVaccinationTitleTxt}>Documents</Text>
                    </View>
                    <View style={styles.bodyVaccinationContainerInformation}>
                        <Text style={styles.bodyDVaccinationInformationTxt}>
                            Certificat de vacinnation (24/12/24)
                        </Text>
                    </View>
                </View> */}

                {/* Health history Container */}
                {/* <View style={styles.bodyHealthHistoryContainer}></View> */}
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

    // BODY PART

    body: {
        height: '70%',
        marginTop: 45,
        // justifyContent: 'center'
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
        color: "#1472AE",
        fontWeight: 800,
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




    // Body Information

    // bodyInformationCard: {
    //     height: '25%',
    //     width: '100%',
    //     borderWidth: 5,
    //     borderColor: 'gray'
    // },
    // bodyInformationContainer: {
    //     height: '30%',
    //     width: '100%',
    //     borderWidth: 5,
    //     borderColor: 'blue'
    // },
    // bodyInformationTitle: {
    //     borderWidth: 5,
    //     borderColor: 'black'
    // },
    // bodyInformationTitleTxt: {
    //     borderWidth: 5,
    //     borderColor: 'blueviolet'
    // },
    // bodyInformationGeneral: {
    //     height: '70%',
    //     width: '100%',
    //     borderWidth: 5,
    //     borderColor: 'green'
    // },
    // bodyInformationGender: {
    //     borderWidth: 5,
    //     borderColor: 'yellow'
    // },
    // bodyInformationIdentification: {
    //     borderWidth: 5,
    //     borderColor: 'orange'
    // },
    // bodyInformationWeight: {
    //     borderWidth: 5,
    //     borderColor: 'black'
    // },

    // // Body Document
    // bodyDocumentContainer: {
    //     height: '20%',
    //     width: '100%',
    // },
    // bodyDocumentContainerTitle: {},
    // bodyDocumentContainerTitleTxt: {},
    // bodyDocumentContainerInformation: {},
    // bodyDocumentContainerInformationTxt: {},

    // // Body Vaccination
    // bodyInformationVaccination: {
    //     height: '15%',
    //     width: '100%',
    // },
    // bodyInformationVaccinationTitle: {},
    // bodyInformationVaccinationTitleTxt: {},
    // bodyVaccinationContainerInformation: {},
    // bodyVaccinationContainerInformationTxt: {},

    // // Body Health history
    // bodyHealthHistoryContainer: {
    //     height: '40%',
    //     width: '100%',
    // }
})