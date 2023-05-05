import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import GlobalContext from "../context/GlobalContext";
import axios from 'axios';


// ==================== INCOME EDIT SCREEN =================  

export const EditIncome = ({ route, navigation }) => {
    const { income } = route.params
    const id = income.id
    const user = income.user
    const [name, setName] = useState(income.name)
    const [category, setCategory] = useState(income.category)
    const [amount, setAmount] = useState(income.amount)
    console.log('AMOUNT: ', amount)
    const [date, setDate] = useState(new Date(income.date))
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)
    const link = `${URL}/incomes/${id}/`
    console.log( 'LINK: ', link)

    const handleValueChange = (text) => {
        if (text === '') {
          setAmount(0);
        } else {
          setAmount(parseInt(text));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            id: id,
            category: category,
            name: name,
            amount: amount,
            date: date.toISOString().split('T')[0],
            user: user
        }
        console.log(data)
        try {
            const response = await axios.put(`${URL}/incomes/${id}/`, data, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Referer': URL
                }
            })
            console.log('UPDATE Income: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('PUT Income Error message: ', error)
        } 
    }

    return (
        <View style={styles.container}>

            <View style={[styles.header, styles.headerExpense]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='caret-back' size={30} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Income</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.input}
                        value={amount.toString()}
                        keyboardType='numeric'
                        onChangeText={handleValueChange}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category:</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <Picker.Item label={category} value={category} />
                        <Picker.Item label="Salary" value="salary" />
                        <Picker.Item label="Freelance" value="freelance" />
                        <Picker.Item label="Investment" value="investment" />
                        <Picker.Item label="Rental" value="rental" />
                        <Picker.Item label="Grant" value="grant" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date:</Text>
                    <DatePicker date={date} onDateChange={setDate}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

// ==================== EXPENSE EDIT SCREEN =================  

export const EditExpense = ({ route, navigation }) => {
    const { expense } = route.params
    const id = expense.id
    const user = expense.user
    const [name, setName] = useState(expense.name)
    const [category, setCategory] = useState(expense.category)
    const [amount, setAmount] = useState(expense.amount)
    console.log('AMOUNT: ', amount)
    const [date, setDate] = useState(new Date(expense.date))
    const {URL, csrftoken, fetchData} = useContext(GlobalContext)
    const link = `${URL}/expenses/${id}/`
    console.log( 'LINK: ', link)

    const handleValueChange = (text) => {
        if (text === '') {
          setAmount(0);
        } else {
          setAmount(parseInt(text));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            id: id,
            category: category,
            name: name,
            amount: amount,
            date: date.toISOString().split('T')[0],
            user: user
        }
        console.log(data)
        try {
            const response = await axios.put(`${URL}/expenses/${id}/`, data, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Referer': URL
                }
            })
            console.log('UPDATE Expense: ', response.data)
            fetchData()
            navigation.navigate('Home')
        } catch (error) {
            console.log('PUT Expense Error message: ', error)
        } 
    }

    return (
        <View style={styles.container}>

            <View style={[styles.header, styles.headerExpense]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='caret-back' size={30} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Expense</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.input}
                        value={amount.toString()}
                        keyboardType='numeric'
                        onChangeText={handleValueChange}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category:</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <Picker.Item label={category} value={category} />
                        <Picker.Item label="Food" value="food" />
                        <Picker.Item label="Housing" value="housing" />
                        <Picker.Item label="Transportation" value="transportation" />
                        <Picker.Item label="Entertainment" value="entertainment" />
                        <Picker.Item label="Personal Care" value="personal care" />
                        <Picker.Item label="Health" value="health" />
                        <Picker.Item label="Education" value="education" />
                        <Picker.Item label="Kids" value="kids" />
                        <Picker.Item label="Pets" value="pets" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date:</Text>
                    <DatePicker date={date} onDateChange={setDate}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}


// ======================= STYLESHEETS ======================  

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
    // button: {
    //     backgroundColor: '#295fa6',//'#1b4965',
    //     marginTop: 20,
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     borderRadius: 5,
    //     alignSelf: 'center',
    // },
    //     buttonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 15,
    // },

    button: {
        backgroundColor: '#295fa6', //'#800f2f',
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignSelf: 'center',
    },
        buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
