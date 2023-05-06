import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';


// ==================== ADD INCOME SCREEN =================

export const AddIncome = ({route, navigation}) => {
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)

    const handleAddIncome = async () => {
        try {
            const response = await axios.post(`${URL}/incomes/`, {
                category: category,
                name: name,
                amount: amount,
                date: date.toISOString().split('T')[0]
            }, {
                headers: {
                'X-CSRFToken': csrftoken,
                'Referer': URL
                }
            })
            console.log('POST Income: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('POST Income Error message: ', error)
        }
    }

    return (
    <View style={styles.container}>

        <View style={[styles.header, styles.headerIncome]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='caret-back' size={30} color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>New Income</Text>
        </View>

        <View style={styles.content}>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Category:</Text>
                <Picker
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value)}
                >
                    <Picker.Item label="Select a category" value="" />
                    <Picker.Item label="Salary" value="Salary" />
                    <Picker.Item label="Business/Freelance" value="Business/Freelance" />
                    <Picker.Item label="Investment" value="Investment" />
                    <Picker.Item label="Rental" value="Rental" />
                    <Picker.Item label="Grant" value="Grant" />
                    <Picker.Item label="Other" value="Other" />

                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => setAmount(text)}
                    value={amount}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date:</Text>
                <DatePicker date={date} onDateChange={setDate}
                />
            </View>

            <View style={styles.inputContainer}>
                <Button
                    onPress={handleAddIncome}
                    title="Add Income"
                    color="#007AFF"
                />
            </View>

        </View>
    </View>
    )
}


// ==================== ADD EXPENSE SCREEN =================

export const AddExpense = ({route, navigation}) => {
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)

    const handleAddExpense = async () => {
        try {
            const response = await axios.post(`${URL}/expenses/`, {
                category: category,
                name: name,
                amount: amount,
                date: date.toISOString().split('T')[0]
            }, {
                headers: {
                'X-CSRFToken': csrftoken,
                'Referer': URL
                }
            })
            console.log('POST Expenses: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('POST Expenses Error message: ', error.message)
        }
    }

    return (
    <View style={styles.container}>

        <View style={[styles.header, styles.headerIncome]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='caret-back' size={30} color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>New Expense</Text>
        </View>

        <View style={styles.content}>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Category:</Text>
                <ScrollView style={{ height: 80 }}>

                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <Picker.Item label="Select a category" value="" />
                        <Picker.Item label="Groceries" value="Groceries" />
                        <Picker.Item label="Rent/Mortgage" value="Rent/Mortgage" />
                        <Picker.Item label="Utilities" value="Utilites" />
                        <Picker.Item label="Childcare" value="Childcare" />
                        <Picker.Item label="Healthcare" value="Healthcare" />
                        <Picker.Item label="Transportation" value="Transportation" />
                        <Picker.Item label="Dining out" value="Dining out" />
                        <Picker.Item label="Entertainment" value="Entertainment" />
                        <Picker.Item label="Cable/Internet/Phone" value="Cable/Internet/Phone" />
                        <Picker.Item label="Shopping" value="Shopping" />
                        <Picker.Item label="Education" value="Education" />
                        <Picker.Item label="Travel" value="Travel" />
                        <Picker.Item label="Loan" value="Loan" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>

                </ScrollView>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => setAmount(text)}
                    value={amount}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date:</Text>
                <DatePicker date={date} onDateChange={setDate}
                />
            </View>

            <View style={styles.inputContainer}>
                <Button
                    onPress={handleAddExpense}
                    title="Add Expense"
                    color="#007AFF"
                />
            </View>

        </View>
    </View>
    )
}

// ======================= STYLESHEETS =====================

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
    inputContainer: {
        marginTop: 10,
        paddingVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        fontSize: 16,
        color: '#212529'
    },
})