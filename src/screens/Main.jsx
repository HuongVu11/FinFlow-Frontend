import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Main = ({ navigation }) => {
    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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

export default Main;