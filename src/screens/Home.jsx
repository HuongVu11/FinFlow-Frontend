import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import axios from 'axios';

const URL = 'http://10.0.2.2:8000'

export const Home = () => {
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [balance, setBalance] = useState(0);
    const [csrftoken, setCsrftoken] = useState(null)

    const headers = {headers: {
        'X-CSRFToken': 'U0peQnBdkoy1QIs3i4xmdXYOVTUJK5ai',
    }}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceResponse = await axios.get(
                    `${URL}/balance/`,
                    headers
                )
                console.log('BALANCE: ', balanceResponse.data)

                const incomesResponse = await axios.get(
                    `${URL}/incomes/`,
                    headers
                );
                console.log('INCOME: ', incomesResponse.data)

                const expensesResponse = await axios.get(
                    `${URL}/expenses/`,
                    headers
                );
                console.log('EXPENSES: ', expensesResponse.data)

                setBalance(balanceResponse.data.balance);
                setIncomes(incomesResponse.data);
                setExpenses(expensesResponse.data);
            } catch (error) {
                console.log('Error message 2: ', error.message);
                console.log('Error stack 2: ', error.stack);
            }
        } 
        fetchData();
    }, []);

    const handleAddIncome = () => {
        // AddIncome screen
    };

    const handleAddExpense = () => {
        // AddExpense screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.subContainerItem}>
                    <Text style={styles.label}>BALANCE</Text>
                    <Text style={styles.amount}>{balance}</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Button title="Add Income" onPress={handleAddIncome} />
                <Button title="Add Expense" onPress={handleAddExpense} />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.label}>DETAILS</Text>
            </View>
            <View style={styles.subContainer}>
                {incomes && expenses && (
                    <SectionList
                        sections={[
                            {title: 'Incomes', data: incomes},
                            {title: 'Expenses', data: expenses}
                        ]}
                        renderItem={({item}) => (<Text style={styles.sectionItem}>{item.name} - {item.amount}</Text>)}
                        renderSectionHeader={({section}) => (
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        nestedScrollEnabled={true} // enable nested scrolling
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    subContainerItem: {
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 22,
        paddingVertical: 5,
        paddingLeft: 10,
        backgroundColor: 'gray',
    },
    sectionItem: {
        fontSize: 18,
        marginBottom: 5,
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
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 60,
        paddingBottom: 20
    },
});

