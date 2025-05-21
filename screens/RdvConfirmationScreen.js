import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useMemo } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // ou react-native-vector-icons


const data = [
    { value: "Soins préventifs", label: "Soins préventifs" },
    { value: "Maladies et urgences", label: "Maladies et urgences" },
    { value: "Suivi et soins spécifiques", label: "Suivi et soins spécifiques" },
]

export default function TakeRdvScreen() {

    const [confirmed, setConfirmed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <FontAwesome name="arrow-left" size={15} color="#1472AE" style={{ color: '#1472AE', marginLeft: 30 }} />
                {/* //-------------------------------------------------TITRE DE LA PAGE */}
                <Text style={styles.pageTitle}>Récapitulatif</Text>
                <Text style={{ fontSize: 20, frontWeight: 'bold', color: '#1472AE', marginRight: 30 }}>2/2</Text>
            </View>
            {/* -------------------------------------------------ENCART DU PROFESSIONNEL */}
            <View style={styles.bodyContainer}>
                <View style={styles.recapContainer}>
                    <View style={styles.proContainer}>
                        <Image source={require('../assets/doctorPicture.jpg')} style={styles.image} />
                        <View style={styles.proInfo}>
                            <Text style={styles.text}>Isabelle Artas</Text>
                            <Text style={styles.text}>Vétérinaire</Text>
                        </View>
                        {/* ------------------------------------------------- DONNEES DU RDV */}
                    </View>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable
                        onPress={() => setConfirmed(true)}
                        style={{
                            backgroundColor: confirmed ? '#008000' : '#0B2A59', // vert ou bleu foncé
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '80%',
                            justifyContent: 'center',
                        }}
                    >
                        {confirmed && (
                            <MaterialCommunityIcons
                                name="checkbox-marked-outline"
                                size={20}
                                color="white"
                                style={{ marginRight: 8 }}
                            />
                        )}
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            {confirmed ? 'Merci !' : 'Confirmer le rendez-vous'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    headerContainer: {
        width: '100%',
        height: '13%',
        backgroundColor: '#ffff',
        borderBottomWidth: 1,
        borderBottomColor: '#1472AE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    pageTitle: {
        fontWeight: 800,
        fontSize: 26,
        color: '#1472AE',
        marginLeft: 30,
    },

    bodyContainer: {
        height: '87%',
        width: '100%',
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    recapContainer: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        height: '70%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#0D2C56',
        backgroundColor: '#ffff',
    },

    proContainer: {
        padding: 15,
        width: '100%',
        height: 125,
        backgroundColor: '#0D2C56',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },
    image: {
        width: '30%',
        height: '100%',
        borderRadius: 50,
    },

    proInfo: {
        width: '60%',
        height: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    text: {
        color: '#ffff',
        fontSize: 20,
    },


})