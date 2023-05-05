import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export const Logout = ({navigation}) => {
    const { URL, csrftoken, setCsrftoken, setIsAuthenticated } = useContext(GlobalContext)

    const handleLogout = async () => {
        try {
            const response = await axios.delete(`${URL}/authentications/logout/`, {
                withCredentials: true,
                headers: {
                   'X-CSRFToken': csrftoken,
                   'Referer': URL
                }
            })
            console.log(response.data)
            setCsrftoken(null)
            setIsAuthenticated(false)
            navigation.navigate('MainStack')
        } catch (error) {
            console.log('LOGOUT Error message: ', error)
        }
    };
    return(
        // <TouchableOpacity style={styles.button} onPress={handleLogout}>
        //     <Text style={styles.buttonText}>Logout</Text>
        // </TouchableOpacity>

        <DrawerContentScrollView>
            {/* <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} /> */}
            {/* Other drawer items */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={ styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 50,
        paddingLeft: 30,
    },
    buttonText: {
        fontSize: 18,
        color: '#212529',
        fontWeight: 500
    }
})
