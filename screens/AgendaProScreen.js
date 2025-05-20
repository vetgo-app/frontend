import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function agendaPro() {
    const calendar = <FontAwesome name={"calendar"} size={40}  style={styles.calendarIcon} />;

    return(
        <View style={styles.mainDiv} >
            <View style={styles.header}>
                <View style={styles.topHeader}>
                    <View style={styles.profilPicture}>
                        <Image source={require('../assets/vetoImg.png')} alt="imageVeto" style={styles.vetoImg} />
                    </View>
                    <View style={styles.agenda}>
                        <View style={styles.topAgenda}>
                            <Text style={styles.topAgendaTxt}>Mon agenda</Text>
                        </View>
                        <View style={styles.bottomAgenda}>
                            {calendar}
                            <View style={styles.dateContainer}>
                                <Text style={styles.profilDate}>June 10, 2024</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomHeader}>
                    <TouchableOpacity style={styles.previousBtn}>
                        <Text style={styles.previousBtnTxt} >{'<'}  Précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextBtn}>
                        <Text style={styles.nextBtnTxt} >Suivant  {'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.cardContainer}>
                    <View style={styles.hoursContainer}>
                        <Text style={styles.hours}>9:00</Text>
                    </View>
                    <View style={styles.information}>
                        <Text style={styles.anmialInfo}>Chat / Siamois / Poupon</Text>
                        <Text style={styles.reasonConsultation}>Vaccin</Text>
                        <Text style={styles.profesionnalName}>M Dupont</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        fontFamily: 'Arial, sans-serif'
    },

    // HEADER PART
    header: {
        height: "35%",
        alignItems: 'center'
    },
    topHeader: {
        height: "70%",
        flexDirection: 'row',
    },
    profilPicture:{
        height: "100%",
        width: "40%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    vetoImg: {
        height: 130,
        width: 130,
        borderRadius: 100,
    },
    agenda:{
        height: "100%",
        width: "60%",
    },
    topAgenda: {
        height: "50%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    topAgendaTxt: {
        fontSize: 20,
        fontFamily: 'Poppins'
    },
    bottomAgenda: {
        height: "50%",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    calendarIcon: {
        color: "#0D2C56",
        marginLeft: 20
    },
    profilDate:{
        backgroundColor: 'lightgray',
        padding: "7",
        borderRadius: "6%",
        fontSize: 20,
        marginRight: 20
    },
    bottomHeader: {
        height: "30%",
        width: "70%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    previousBtn: {
        backgroundColor: "#0D2C56",
        padding: 8,
        borderRadius: 10,
        fontWeight: "800",
    },
    nextBtn: {
        backgroundColor: "#0D2C56",
        padding: 8,
        borderRadius: 10,
    },
    previousBtnTxt: {
        fontSize: 16,
        color: 'white',
        fontWeight: "600",
    },
    nextBtnTxt: {
        fontSize: 16,
        color: 'white',
        fontWeight: "600",
    },


    // BODY PART
    body: {
        height: "65%",
        flexDirection: "row",
        justifyContent: 'center',
    },
    cardContainer: {
        height: "20%",
        width: "80%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    hoursContainer: {
        height: "64%",
        width: "21%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1472AE",
        borderRadius: 100,
    },
    hours: {
        color: "white"
    },
    information: {
        height: "80%",
        width: "70%",
        borderWidth: 1,
        borderColor: "#1472AE",
        borderRadius: 11,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    anmialInfo:{
        marginLeft: 15
    },
    reasonConsultation:{
        marginLeft: 15
    },
    profesionnalName:{
        marginLeft: 15
    },
});