import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function MapSearchScreen(navigation) {
    const route = useRoute();
    const adresse = route.params?.adresse; //on récupère l'adresse envoyé dans homeScreen

    const [region, setRegion] = useState(null);  //Stocke la zone à afficher sur la carte (latitude, longitude)
    const [veterinaires, setVeterinaires] = useState([]); // Stocke la liste des vétérinaires à afficher.
    const [activeFilter, setActiveFilter] = useState(null); //Stocke le filtre sélectionné ("Au + tôt", "À Domicile", etc.)

 useEffect(() => {
    // Si une adresse est donnée → recherche les coordonnées via l'API
    if (adresse) {
<<<<<<< HEAD
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse)}&limit=1`)
=======
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse)}&limit=5`)
>>>>>>> urgence
            .then(res => res.json())
            .then(data => {
                if (data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    const longitude = coords[0];
                    const latitude = coords[1];

                    //on centre la carte sur cette adresse, avec un certain zoom delta
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    
                    //professionnels qui se filtrent en fonction de l'adresse
                    setVeterinaires([
                        {
                            nom: 'Isabelle Veto',
                             specialite: 'Vétérinaire',
                             distance: '100 m',
                             image: 'photo',
                            lat: latitude + 0.002,
                            lon: longitude + 0.001,
                        },
                        
                    ]);
                }
            });
    } else {
        // Sinon : affiche Paris par défaut
        const latitude = 48.866667;
        const longitude = 2.333333;

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }); //on centre la carte 

        //tous les professionnels s'affichent
        setVeterinaires([
            {
                nom: 'Isabelle Veto',
                specialite: 'Vétérinaire',
                distance: '100 m',
                image: 'photo',
                lat: latitude + 0.002,
                lon: longitude + 0.001,
            },
            
        ]);
    }
}, [adresse]);

    return (
        <View style={styles.container}>
            {/* Filtres */}
            <View style={styles.filterContainer}>
                {['Au + tôt', 'A Domicile', 'Visio'].map((filter, index) => (
                    <TouchableOpacity key={index} onPress={() => setActiveFilter(filter)}>
                        <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Adresse + bouton Liste */}
            <View style={styles.addressBar}>
                <Text style={styles.addressText} numberOfLines={2}>{adresse}</Text>
                <TouchableOpacity>
                    <FontAwesome name="th-list" size={22} color="#0D2C56" />
                </TouchableOpacity>
            </View>

            {/* Carte */}
            {region && (
                <MapView style={styles.map} region={region}>
                    {veterinaires.map((vet, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: vet.lat, longitude: vet.lon }}
                            title={vet.nom}
                            description={vet.specialite}
                        >
                            <FontAwesome name="paw" size={30} color="#1472AE" />
                        </Marker>
                    ))}
                </MapView>
            )}

            {/* Liste des praticiens */}
            <ScrollView contentContainerStyle={styles.vetList}>
                {veterinaires.map((vet, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.vetCard}
                        onPress={() =>
                            navigation.navigate("InfoProScreen", {
                                nom: vet.nom,
                                specialite: vet.specialite,
                                adresse: "56 Boulevard Pereire, Paris", // temporaire
                                image: vet.image,
                                photoClinique: 'https://cdn.pixabay.com/photo/2016/04/30/20/31/animal-1368558_1280.jpg', // image de clinique fictive
                            })
                        }
                    >
                        <Image source={{ uri: vet.image }} style={styles.vetImage} />
                        <View>
                            <Text style={styles.vetName}>{vet.nom}</Text>
                            <Text style={styles.vetSpec}>{vet.specialite}</Text>
                            <Text style={styles.vetDist}>{vet.distance}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F9FF',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    filterText: {
        fontSize: 16,
        color: '#0D2C56',
    },
    filterTextActive: {
        fontWeight: 'bold',
    },
    addressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    addressText: {
        fontSize: 16,
        color: '#0D2C56',
        fontWeight: '500',
        maxWidth: '85%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: '40%',
    },
    vetList: {
        padding: 15,
        backgroundColor: '#F2F9FF',
    },
    vetCard: {
        flexDirection: 'row',
        backgroundColor: '#0D2C56',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
    },
    vetImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    vetName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    vetSpec: {
        color: 'white',
        marginTop: 2,
    },
    vetDist: {
        color: 'white',
        marginTop: 4,
        fontSize: 12,
    },
});