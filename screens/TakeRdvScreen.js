import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';

const data = [
    { value: "🐈", label: "🐈 un Gato" },
    { value: "🦮", label: "🦮 un Perro" },
    { value: "🐍", label: "🐍 una serpiente" },
    { value: "1", label: "🐍 una serpiente" },
    { value: "2", label: "🐍 una serpiente" },
    { value: "3", label: "🐍 una serpiente" },
    { value: "4", label: "🐍 una serpiente" },
    { value: "5", label: "🐍 una serpiente" },
]

export default function TakeRdvScreen() {
    const [selectedReason, setSelectedReason] = useState(null);
    const [isSelectedReason, setIsSelectedReason] = useState(false)

    const handlePressReason = (value) => {
        setSelectedReason(value);
        console.log('value', value)
    }

    const handleShowReasons = () => {
        setIsSelectedReason(!isSelectedReason)
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Prise de rendez-vous</Text>
            <View style={styles.proContainer}>
                <Image source={require('../assets/doctorPicture.jpg')} style={styles.image} />
                <View style={styles.proInfo}>
                    <Text style={styles.text}>Isabelle Artas</Text>
                    <Text style={styles.text}>Vétérinaire</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleShowReasons}><Text style={{ fontWeight: 700 }}>Selectionner un motif</Text></TouchableOpacity>
            {/* {isSelectedReason && ( */}
            <View style={styles.reasons}>
                <FlatList
                    style={{
                        borderWidth: 2,
                        borderColor: 'grey',
                        padding: (5, 20),
                        borderRadius: 15,
                    }}
                    keyExtractor={(item) => item.value}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handlePressReason(item.value)}
                            style={{ paddingVertical: 10, paddingLeft: 10, backgroundColor: '#F0F0F0', marginBottom: 10, borderRadius: 10 }}
                        >
                            <Text>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                />
            </View>

            <Text style={{ fontWeight: 700 }}>Premier rendez-vous ?</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: '',
    },
    pageTitle: {
        fontWeight: 800,
        fontSize: 26,
        color: '#1472AE',
        marginTop: 15,
        marginBottom: 30,
    },
    proContainer: {
        padding: 15,
        width: '80%',
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

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        height: 40,
        marginTop: 30,
        backgroundColor: '#C2E7F7',
        borderRadius: 10,
        marginBottom: 20,
    },

    reasons: {
        padding: 10,
        height: 150,
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
    },
})