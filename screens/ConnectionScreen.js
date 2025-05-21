import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function ConnectionScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        console.log(JSON.stringify({
            email: email,
            password: password,
        }));
        fetch('http://192.168.100.14:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(response => response.json()).then(data => {
            if (data) {
                setEmail('');
                setPassword('');
            }
        }).catch(error => {
            console.error('Error:', error);
        }
        );
    }

    const handleSignUp = () => {

    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>Me connecter</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.signinInputs}>
                    <TextInput  style={styles.emailInput} placeholder="email" onChangeText={(value) => setEmail(value)} value={email} />
                    <TextInput style={styles.passwordInput} placeholder="password" onChangeText={(value) => setPassword(value)} value={password} />
                    <TouchableOpacity onPress={handleSignIn} style={{ backgroundColor: '#1472AE', width: '100%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffff', fontSize: 20 }}>Se connecter</Text>
                    </TouchableOpacity>

                    
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

    signinInputs: {
        width: '80%',
        height: 125,
        backgroundColor: '#ffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        marginBottom: 30,
    },

    emailInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
    },

    passwordInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,

    },


})