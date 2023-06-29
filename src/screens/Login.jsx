import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';

// ==================== LOGIN SCREEN =================

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigation = useNavigation();
    const {URL, csrftoken, setCsrftoken, isAuthenticated, setIsAuthenticated, fetchData} = useContext(GlobalContext)

    const handleLogin = async () => {
        try {
            const response = await axios.put(
                `${URL}/authentications/login/`,
                {
                    username: username,
                    password: password
                }
            );
            console.log('login', response.data)
            console.log('login', response.data)
            const csrftoken = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
            console.log('CSRFToken: ', csrftoken)
            setCsrftoken(csrftoken)
            setIsAuthenticated(true)
            console.log(`Sucessful, Username: ${username}`)
            console.log('Login at Authenticated: ', isAuthenticated)
            console.log(csrftoken, 'csrftoken at login')
            fetchData()
            navigation.navigate('HomeStack')
        } catch (error) {
            console.log('LOGIN Error message: ', error)
            setErrorMessage('Invalid username or password, please try again.')
        }
    }

    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/fDnjV1L/ffbgwhite.jpg" }}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
            </View>
        </ImageBackground>
    )
}

// ==================== REGISTER SCREEN =================

export const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const {URL, setCsrftoken, setIsAuthenticated} = useContext(GlobalContext)
    const navigation = useNavigation()
  
    const handleRegister = async() => {
        try {
            const response = await axios.post(`${URL}/authentications/register/`, {
                username: username,
                password: password,
                repassword: repassword
            })
            console.log(response)
            const csrftoken = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
            console.log('CSRFToken: ', csrftoken)
            setCsrftoken(csrftoken)
            setIsAuthenticated(true)
            console.log(`Sucessful, Username: ${username}`)
            fetchData()
            navigation.navigate('Home')
          } catch (error) {
            console.log('REGISTER Error message: ', error.message)
            setErrorMessage('Something went wrong, please try again.')
          }
    }
  
    return (

        <ImageBackground
            source={{ uri: "https://i.ibb.co/fDnjV1L/ffbgwhite.jpg" }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={repassword}
                    onChangeText={setRepassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
            </View>
        </ImageBackground>
    )
  }

// ==================== STYLES =================

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#212529'
    },
    input: {
        width: '60%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        fontSize: 18,
        color: '#212529'
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});