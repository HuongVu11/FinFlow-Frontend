import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// ==================== LOGIN SCREEN =================

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [csrftoken, setCsrftoken] = useState(null)
    const navigation = useNavigation();

    const data = {
        username: '....',
        password: '....',
    }

    const handleLogin = async (data) => {
        try {
            const response = await axios.put(
                'http://10.0.2.2:8000/authentications/login/',
                data
            );
            console.log(response)
            const csrftoken = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
            console.log('CSRFToken: ', csrftoken)
            setCsrftoken(csrftoken)
            const headers = {
                headers: {
                    'X-CSRFToken': csrftoken,
                },
            };
            console.log(`Sucessful, Username: ${username}`);
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error message 1: ', error.message);
            console.log('Error stack 1: ', error.stack);
        setErrorMessage('Invalid username or password, please try again.');
        }
    };

    return (
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
    );
};

// ==================== LOGOUT SCREEN =================

export const Logout = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [csrftoken, setCsrftoken] = useState(null)
    const navigation = useNavigation();

    const data = {
        username: '...',
        password: '...',
    }

    const handleLogout = async (userObj) => {
        try {
            const response = await axios.get(
                'http://10.0.2.2:8000/authentications/logout/',
                userObj
            );
            console.log(response)
            setCsrftoken(null)
            console.log(`Sucessful, Username: ${username}`);
            navigation.navigate('Main');
        } catch (error) {
            console.log('Error message 1: ', error.message);
            console.log('Error stack 1: ', error.stack);
        setErrorMessage('Invalid username or password, please try again.');
        }
    };

    return (
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
    );
};

// ==================== REGISTER SCREEN =================

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [csrftoken, setCsrftoken] = useState(null)
    const navigation = useNavigation();

    const userObj = {
        username: username,
        password: password,
        repassword: repassword
    }
  
    const handleRegister = async(userObj) => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/authentications/register/', userObj);
            console.log(response)
            const csrftoken = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
            console.log('CSRFToken: ', csrftoken)
            setCsrftoken(csrftoken)
            console.log(`Sucessful, Username: ${username}`);
            navigation.navigate('Home');
          } catch (error) {
            console.log('Error message 3: ', error.message);
            console.log('Error stack 3: ', error.stack);
            setErrorMessage('Something went wrong, please try again.');
          }
    }
  
    return (
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
    )
  }

// ==================== STYLES =================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '60%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
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
        fontSize: 15,
    },
});