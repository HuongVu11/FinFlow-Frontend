import React, { useEffect, useContext, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import MonthPicker from 'react-native-month-year-picker'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GlobalContext from '../context/GlobalContext'

export const Database = ({navigation}) => {
        const {URL, csrftoken, incomes, expenses} = useContext(GlobalContext)
        const [selectedMonth, setSelectedMonth] = useState(null)
        const [selectedIncomes, setSelectedIncomes] = useState(incomes)
        const [selectedExpenses, setSelectedExpenses] = useState(expenses)
        const [show, setShow] = useState(false)
        const [header, setHeader] = useState('Select a month')
        const showPicker = useCallback((value) => setShow(value), [])

        const getMonth = (choosenDate) => {
            console.log('getMonth date', choosenDate)
            if (choosenDate !== null) {
                const dateString = choosenDate.toISOString()
                return dateString.substring(0,7)
            } else {
                return
            }
        }

        const getMonthlyData = (selectedMonth) => {
            if (selectedMonth !== null) {
                const incomesData = incomes.map(income => {
                    return {
                        ...income,
                        date: income.date.substring(0, 7)
                    }
                })
                const expensesData = expenses.map(expense => {
                    return {
                        ...expense,
                        date: expense.date.substring(0, 7)
                    }
                })
                const monthlyIncomes = incomesData.filter((income) => income.date === selectedMonth)
                const monthlyExpenses = expensesData.filter((expense) => expense.date === selectedMonth)
                setSelectedIncomes(monthlyIncomes)
                setSelectedExpenses(monthlyExpenses)
            } else {
                return
            }
        }

        const onValueChange = useCallback(
                (event, newDate) => {
                    if (newDate) {
                        const selectedMonth = getMonth(newDate)
                        showPicker(false)
                        setSelectedMonth(selectedMonth)
                        setHeader(selectedMonth)
                        console.log('selectedMonth', selectedMonth)
                    } else {
                        showPicker(false)
                    }
                },
            [new Date(), showPicker]
        )

    useEffect(() => {
        if (csrftoken) {
            getMonthlyData(selectedMonth)
        }
    }, [selectedMonth])

    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/yYmxrWd/ffbghue-1.jpg" }}
            style={styles.backgroundImage}
        >

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.subContainer}>

                    <View style={styles.monthSelectCtn}>
                        <TouchableOpacity onPress={() => {
                            setSelectedIncomes(incomes)
                            setSelectedExpenses(expenses)
                            setHeader('Select a month')
                        }}>
                            <MaterialCommunityIcons name='restart' size={35} color='gray' />
                        </TouchableOpacity>

                        <Text style={styles.label}>{header}</Text>
                        
                        <TouchableOpacity onPress={() => showPicker(true)}>
                            <Octicons name='single-select' size={30} color='gray' />
                        </TouchableOpacity>
                    </View>

                    {show && (
                        <MonthPicker
                        onChange={onValueChange}
                        value={new Date()}
                        minimumDate={new Date(2020, 1)}
                        maximumDate={new Date()}
                        locale="en"
                        />
                    )}
                </View>


                <View style={styles.header}>
                    <Text style={styles.title}>Incomes</Text>
                </View>
                {selectedIncomes && selectedIncomes !== null && selectedIncomes.length > 0 ? (
                    selectedIncomes.map((income) => (
                        <View key={income.id} style={[styles.itemContainer, styles.incomeCtn]}>
                            <TouchableOpacity onPress={() => navigation.navigate('IncomeDetail', {
                                income: income})
                            }>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{income.name}</Text>
                                    <Text style={[styles.itemAmount, styles.incomeAmount]}>${income.amount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                    ) : (
                        <View style={[styles.itemContainer, styles.incomeCtn]}>
                            <Text style={styles.itemName}>No income</Text>
                        </View>
                    )
                }

                <View style={styles.header}>
                    <Text style={styles.title}>Expenses</Text>
                </View>
                {selectedExpenses && selectedExpenses !== null && selectedExpenses.length > 0 ? (
                    selectedExpenses.map((expense) => (
                        <View key={expense.id} style={[styles.itemContainer, styles.expenseCtn]}>
                            <TouchableOpacity onPress={() => navigation.navigate('ExpenseDetail', {
                                expense: expense})
                            }>
                                <View style={[styles.itemDetails]}>
                                    <View style={styles.itemNameCtn}>
                                        <Text style={styles.itemName}>{expense.name}</Text>
                                    </View>
                                    <View style={styles.itemAmountCtn}>
                                        <Text style={[styles.itemAmount, styles.expenseAmount]}>${expense.amount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                    ) : (
                        <View style={[styles.itemContainer, styles.expenseCtn]}>
                            <Text style={styles.itemName}>No expense</Text>
                        </View>
                    )
                }

            </ScrollView>

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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
        color: '#333533',
    },
     subContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    itemContainer: {
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '90%',
    },
    incomeCtn: {
        backgroundColor: '#d3f6ff'
    },
    expenseCtn: {
        backgroundColor: '#fff0e1'
    },
    itemIcon: {
        marginRight: 10,
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    itemNameCtn: {
        justifyContent: 'flex-start',
    },
    itemAmountCtn: {
        justifyContent: 'flex-end',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#212529'
    },
    itemAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    incomeAmount: {
        color: '#085e66'
    },
    expenseAmount: {
        color: '#bc3908'
    },
    buttonCtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        paddingHorizontal: 80,
        paddingBottom: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 20, 
        width: '50%',
        height: 55,
        elevation: 10
    },
    monthSelectCtn: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})