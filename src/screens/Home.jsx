import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';

export const Home = ({navigation}) => {
    const {URL, csrftoken, balance, incomes, expenses, fetchData} = useContext(GlobalContext)
    const actualMonth = new Date().toISOString().substring(0, 7)
    console.log('actual moonth',actualMonth)

    const [recentIncomes, setRecentIncomes] = useState(null)
    const [recentExpenses, setRecentExpenses] = useState(null)
    const [totalIncome, setTotalIncome] =useState(null)
    const [totalExpense, setTotalExpense] =useState(null)

    const getTotal = (transactions) => {
        let total = 0
        if (transactions !== null) {
            transactions.forEach((transaction) => {
                total += transaction.amount
            })
        }
        return total
    }

    const getMonthlyData = (selectedMonth) => {
        if (selectedMonth !== null) {
            const incomesData = incomes.map(income => {
                return {
                    ...income,
                    month: income.date.substring(0, 7)
                }
            })
            const expensesData = expenses.map(expense => {
                return {
                    ...expense,
                    month: expense.date.substring(0, 7)
                }
            })
            const monthlyIncomes = incomesData.filter((income) => income.month === selectedMonth)
            const monthlyExpenses = expensesData.filter((expense) => expense.month === selectedMonth)
            setRecentIncomes(monthlyIncomes)
            setRecentExpenses(monthlyExpenses)
            setTotalIncome(getTotal(recentIncomes))
            setTotalExpense(getTotal(recentExpenses))
        } else {
            return
        }
    }

    useEffect(() => {
        if (recentIncomes !== null) {
          setTotalIncome(getTotal(recentIncomes))
        }
      }, [recentIncomes])
      
      useEffect(() => {
        if (recentExpenses !== null) {
          setTotalExpense(getTotal(recentExpenses))
        }
      }, [recentExpenses])

    useEffect(() => {
        if(actualMonth && incomes && expenses) {
            getMonthlyData(actualMonth)
        }
    }, [incomes, expenses])

    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/yYmxrWd/ffbghue-1.jpg" }}
            style={styles.backgroundImage}
        >

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.subContainer}>
                    <Text style={styles.label}>BALANCE</Text>
                    {balance > 0 ? (
                        <Text style={[styles.amount, {color: '#2c6e49'}, {fontSize: 40}]}>{balance.toLocaleString()}</Text>
                    ) : (
                        <Text style={[styles.amount, {color: '#d8572a'}, {fontSize: 40}]}>{balance.toLocaleString()}</Text>
                    )}   
                </View>

                <View style={styles.buttonCtn}>
                    <TouchableOpacity style={[styles.button, styles.incomeCtn]} onPress={() => navigation.navigate('AddIncome')}>
                        <Ionicons name='add' size={50} color={'#085e66'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.expenseCtn]} onPress={() => navigation.navigate('AddExpense')}>
                        <AntDesign name='minus' size={50} color={'#bc3908'}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.header}>
                    <Text style={styles.title}>Current month incomes</Text>
                </View>
                {recentIncomes && recentIncomes !== null && recentIncomes.length > 0 ? (
                    <>
                        {recentIncomes.map((income) => (
                            <View key={income.id} style={[styles.itemContainer, styles.incomeCtn]}>
                                <TouchableOpacity onPress={() => navigation.navigate('IncomeDetail', {
                                    income: income})
                                }>
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{income.name}</Text>
                                        <Text style={[styles.itemAmount, styles.incomeAmount]}>${income.amount.toLocaleString()}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={[styles.itemContainer, styles.incomeTotalCtn]}>
                            <View style={[styles.itemDetails,styles.incomeTotalCtn]}>
                                <Text style={styles.itemName}>TOTAL</Text>
                                <Text style={[styles.itemAmount, styles.incomeAmount]}>${totalIncome.toLocaleString()}</Text>
                            </View>
                        </View>
                    </>

                    ) : (
                        <View style={[styles.itemContainer, styles.incomeCtn]}>
                            <Text style={styles.itemName}>No income</Text>
                        </View>
                    )
                }

                <View style={styles.header}>
                    <Text style={styles.title}>Current month expenses</Text>
                </View>
                {recentExpenses && recentExpenses !== null && recentExpenses.length > 0 ? (
                    <>
                        {recentExpenses.map((expense) => (
                            <View key={expense.id} style={[styles.itemContainer, styles.expenseCtn]}>
                                <TouchableOpacity onPress={() => navigation.navigate('ExpenseDetail', {
                                    expense: expense})
                                }>
                                    <View style={[styles.itemDetails]}>
                                        <View style={styles.itemNameCtn}>
                                            <Text style={styles.itemName}>{expense.name}</Text>
                                        </View>
                                        <View style={styles.itemAmountCtn}>
                                            <Text style={[styles.itemAmount, styles.expenseAmount]}>${expense.amount.toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={[styles.itemContainer, styles.expenseTotalCTn]}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>TOTAL</Text>
                                <Text style={[styles.itemAmount, styles.expenseAmount]}>${totalExpense.toLocaleString()}</Text>
                            </View>
                        </View>
                    </>

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
    },
     subContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20,
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
        fontSize: 20,
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
    incomeTotalCtn: {
        backgroundColor: '#abf4fe',
        border: 2,
    },
    expenseTotalCTn: {
        backgroundColor: '#fedac0',
        fontWeight: 'bold'
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
        paddingBottom: 40,
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
});