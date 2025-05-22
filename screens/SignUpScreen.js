import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { CameraView, CameraType, Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function SignUpScreen() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const cameraRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [facing, setFacing] = useState("back");
    const [profilPicture, setProfilPicture] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await Camera.requestCameraPermissionsAsync();
            setHasPermission(result && result?.status === 'granted');
        })();
    }, []);

    if (!hasPermission) {
        return <View />;
    }


    const uploadPicture = (photo) => {
        const formData = new FormData();

        formData.append("photoFromFront", {
            uri: photo.uri,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    };

    const handleSignUp = () => {
        fetch("http://192.168.100.14:3000/users/signUp", {
            method: "POST",
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ firstname, lastname, email, password, role: 'Particulier', photo: profilPicture }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
                setProfilPicture(null);
            });
    }


    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 }); // Javascript
        photo && uploadPicture(photo);
        console.log(photo);
        setModalVisible(false);
        setProfilPicture(photo.uri);
    };

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "front" ? "back" : "front"));
    };

    const handlePressProfilPhoto = (e) => {
        setModalVisible(true);
    };



    return (
        <SafeAreaView style={styles.container}>
            <Modal visible={modalVisible} animationType="none" transparent>
                <CameraView style={styles.camera} facing={facing} ref={(ref: any) => (cameraRef.current = ref)}>
                    {/* Top container with the setting buttons */}
                    <SafeAreaView style={styles.settingContainer}>
                        <TouchableOpacity style={styles.settingButton} onPress={toggleCameraFacing}>
                            <FontAwesome name="rotate-right" size={25} color="white" />
                        </TouchableOpacity>
                    </SafeAreaView>

                    {/* Bottom container with the snap button */}
                    <View style={styles.snapContainer}>
                        <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
                            <FontAwesome name="circle-thin" size={95} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </Modal>

            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>S'inscrire</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.signUpContainer}>
                    <TouchableOpacity onPress={() => handlePressProfilPhoto()} style={styles.photoUploader}><Image source={profilPicture ? { uri: profilPicture } : require('../assets/add-profile-picture.jpg')} style={{ height: 100, width: 100, borderRadius: 100 }} height={(profilPicture ? 100 : 170)} width={(profilPicture ? 100 : 170)} /></TouchableOpacity>
                    <TextInput textContentType='middleName' autoCapitalize='none' style={styles.firstnameInput} placeholder="Votre prénom" onChangeText={(value) => setFirstname(value)} value={firstname} />
                    <TextInput textContentType='familyName' style={styles.lastnameInput} placeholder="Votre nom" onChangeText={(value) => setLastname(value)} value={lastname} />
                    <TextInput textContentType='emailAddress' autoCapitalize='none' style={styles.emailInput} placeholder="email" onChangeText={(value) => setEmail(value)} value={email} />
                    <TextInput textContentType='password' secureTextEntry={true} style={styles.passwordInput} placeholder="password" onChangeText={(value) => setPassword(value)} value={password} />
                    <TouchableOpacity style={styles.signUpButton} onPress={() => handleSignUp()}>
                        <Text style={{ color: '#ffff', fontSize: 16 }}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity >
                    {/* onPress={() => navigation.navigate('SignInScreen')} */}
                    <Text style={{ fontSize: 16, color: '#1472AE' }}>Vous avez déjà un compte ? <Text style={{ fontWeight: 'bold' }}>Se connecter</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        textAlign: 'center',
        width: '100%',
    },

    bodyContainer: {
        height: '87%',
        width: '100%',
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    signUpContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#ffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    photoUploader: {
        width: 100,
        height: 100,
        backgroundColor: '#ffff',
        borderRadius: 50,
        // borderWidth: 1,
        // borderColor: '#1472AE',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // overflow: 'hidden',
    },

    firstnameInput: {
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#1472AE',
        borderRadius: 10,
        paddingLeft: 10,
    },

    lastnameInput: {
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#1472AE',
        borderRadius: 10,
        paddingLeft: 10,
    },

    emailInput: {
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#1472AE',
        borderRadius: 10,
        paddingLeft: 10,
    },

    passwordInput: {
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#1472AE',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },

    signUpButton: {
        backgroundColor: '#1472AE',
        width: '80%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    camera: {
        flex: 1,
        justifyContent: "space-between",
    },

    settingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    settingButton: {
        width: 40,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    snapContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    snapButton: {
        width: 100,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})