import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Main = ({ navigation }) => {
    console.log(navigation)
    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/fDnjV1L/ffbgwhite.jpg" }}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>FINFLOW</Text>
                <Text style={styles.subtitle}>Track your income and expenses</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Register"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

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
        // backgroundColor: 'white',
        marginBottom: 100
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '50%',
    },
});

export default Main