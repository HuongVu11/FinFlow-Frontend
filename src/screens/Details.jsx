import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalContext from "../context/GlobalContext";
import axios from 'axios';

// ==================== INCOME DETAIL SCREEN =================

export const IncomeDetail = ({navigation, route}) => {
    const [income, setIncome] = useState(route.params.income)
    const id = income.id
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)

    const handleDeleteIncome = async () => {
        console.log('delete')
        try {
            const response = await axios.delete(`${URL}/incomes/${id}/`, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Referer': URL
                }
            })
            console.log('DELETE Income: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('DELETE Income Error message: ', error)
        }
    }
    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.headerIncome]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='caret-back' size={30} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Income Detail</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditIncome', { income: income })}>
                    <AntDesign name='edit' size={30} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>{income.name}</Text>
                <Text style={styles.label}>Category:</Text>
                <Text style={styles.text}>{income.category}</Text>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.text}>{income.amount.toLocaleString()}</Text>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.text}>{income.date}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteIncome}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }

// ==================== EXPENSE DETAIL SCREEN =================    

export const ExpenseDetail = ({navigation, route}) => {
    const { expense } = route.params
    const id = expense.id
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)

    const handleDeleteExpense = async () => {
        console.log('delete')
        try {
            const response = await axios.delete(`${URL}/expenses/${id}/`, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Referer': URL
                }
            })
            console.log('DELETE Expense: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('DELETE Expense Error message: ', error)
        }
    }
    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.headerExpense]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='caret-back' size={30} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Expense Detail</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditExpense', { expense: expense })}>
                    <AntDesign name='edit' size={30} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>{expense.name}</Text>
                <Text style={styles.label}>Category:</Text>
                <Text style={styles.text}>{expense.category}</Text>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.text}>{expense.amount.toLocaleString()}</Text>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.text}>{expense.date}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteExpense}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }


// ========================= STYLESHEETS ====================== 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor:'#403d39',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 40,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#212529'
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        color: '#212529'
    },
    deleteButton: {
        backgroundColor: '#bf0413',
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
        buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
})
