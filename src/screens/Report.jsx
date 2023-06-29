import React, { useEffect, useContext, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ImageBackground} from 'react-native'
import MonthPicker from 'react-native-month-year-picker'
import Octicons from 'react-native-vector-icons/Octicons'
import { PieChart } from 'react-native-chart-kit'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'


export const Report = ({navigation}) => {
    const {URL, csrftoken, balance, incomes, expenses} = useContext(GlobalContext)
    const [selectedMonth, setSelectedMonth] = useState(new Date())
    const [selectedIncomes, setSelectedIncomes] = useState(null)
    const [selectedExpenses, setSelectedExpenses] = useState(null)
    const [show, setShow] = useState(false)
    const [header, setHeader] = useState('Select a month')
    const showPicker = useCallback((value) => setShow(value), [])
    const headers = { headers: { 'X-CSRFToken': csrftoken } }
    const [needsAmount, setNeedsAmount] = useState(0)
    const [wantsAmount, setWantsAmount] = useState(0)
    const [savingsAmount, setSavingsAmount] = useState(0)


    const get532 = (incomes, expenses) => {
        const needsArray = [
            'Groceries', 'Rent/Mortgage', 'Utilities', 'Childcare', 'Healthcare', 'Transportation'
        ]
    
        const wantsArray = [
            'Dining out', 'Entertainment', 'Cable/Internet/Phone', 'Shopping', 'Travel', 'Other'
        ]
    
        const savingsArray = [
            'Loan'
        ]
        if (expenses !== null && expenses.length > 0) {
            let needsAmount = 0;
            let wantsAmount = 0;
            let savingsAmount = 0
            expenses.forEach((expense) => {
                if (needsArray.includes(expense.category)) {
                needsAmount += expense.amount;
                } else if (wantsArray.includes(expense.category)) {
                wantsAmount += expense.amount;
                }
            });
            console.log('incomes', incomes)
            console.log('needsAmount', needsAmount)
            console.log('wantsAmount', wantsAmount)
            const savingsData = incomes - needsAmount - wantsAmount;
            console.log('savingsData', savingsData)
            if (savingsData>0 ) {
                savingsAmount = savingsData
            }
        return [{ 'needs': needsAmount }, { 'wants': wantsAmount }, { 'savings': savingsAmount }];
        }
    }

    const fetchMontlyData = async (choosenDate) => {
        if (choosenDate !== null) {
            const dateString = choosenDate.toISOString()
            console.log(dateString, 'DATE STRING')
            const year = dateString.substring(0,4)
            console.log('YEAR', year)
            const month = dateString.substring(5,7)
            console.log('MONTH', month)
            setHeader(`${year} ${month}`)
            try {
                const incomesResponse = await axios.get(
                    `${URL}/incomes/monthly/?month=${month}&year=${year}`,
                    headers
                )
                console.log('MONTHLY INCOME: ', incomesResponse.data.total)
                const expensesResponse = await axios.get(
                    `${URL}/expenses/monthly/?month=${month}&year=${year}`,
                    headers
                )
                console.log('MONTHLY EXPENSES: ', expensesResponse.data.expenses)
                setSelectedIncomes(incomesResponse.data.total)
                setSelectedExpenses(expensesResponse.data.expenses)
                console.log('selected income', selectedIncomes)
                console.log('selected expense', selectedExpenses)

                if (expensesResponse.data.expenses.length===0) {
                    console.log('No expenses selected')
                    setSelectedExpenses(null)
                    return
                } else {
                    const data = get532(incomesResponse.data.total, expensesResponse.data.expenses);
                    console.log('DATA 532', data)
                    setNeedsAmount(data[0].needs)
                    setWantsAmount(data[1].wants)
                    setSavingsAmount(data[2].savings)
                    console.log('setSaving', data[2].savings)
                }

            } catch (error) {
                console.log('GET MONTLY DATA Error message: ', error)
            }
        } else {
            return
        }
    }


    const onValueChange = useCallback(
        (event, newDate) => {
            if (newDate) {
                const dateString = newDate.toISOString()
                const newHeader = dateString.substring(0,7)
                showPicker(false)
                setSelectedMonth(newDate)
                setHeader(newHeader)
                console.log('selectedMonth', selectedMonth)
            } else {
                showPicker(false)
            }
        },
        [new Date(), showPicker]
    )

    useEffect(() => {
    if (csrftoken) {
        fetchMontlyData(selectedMonth)
    }
    }, [selectedMonth])


    const chartData = [
        {
            name: 'Needs',
            amount: needsAmount,
            color: '#003f5c' ,
        },
        {
            name: 'Wants',
            amount: wantsAmount,
            color: '#bc5090',
        },
        {
            name: 'Savings',
            amount: savingsAmount,
            color: '#ffa600',
        },
    ]


    const scenarioAdvice = {
        'Scenario 1': 'You are doing great! You are spending less than 50% on needs, less than 30% on wants and saving at least 20% of your income.',
        'Scenario 2': 'Your needs are taking up more than 50% of your income. Try to cut back on expenses in this category.',
        'Scenario 3': 'Your wants are taking up more than 30% of your income. Consider if you really need all the items you are spending on in this category, and see if there are ways to reduce these costs.',
        'Scenario 4': 'You are not saving at least 20% of your income. Try to set up automatic savings or make a budget plan for savings.'
    }

    const needsPercentage = (needsAmount/selectedIncomes) * 100;
    const wantsPercentage = (wantsAmount/ selectedIncomes) * 100;
    const savingsPercentage = 100 - needsPercentage- wantsPercentage

    let advice = ''
    if (needsPercentage <= 50 && wantsPercentage <= 30 && savingsPercentage >= 20) {
        advice = scenarioAdvice['Scenario 1']
    } else if (needsPercentage > 50) {
        advice = scenarioAdvice['Scenario 2']
    } else if (wantsPercentage > 30) {
        advice = scenarioAdvice['Scenario 3']
    } else if (savingsPercentage < 20) {
        advice = scenarioAdvice['Scenario 4']
    }

    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/yYmxrWd/ffbghue-1.jpg" }}
            style={styles.backgroundImage}
        >

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.subContainer}>

                    <View style={styles.monthSelectCtn}>
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

                <View style={styles.subCtn}>
                    <Text style={styles.title}>Budget Allocation</Text>
                </View>

                {selectedMonth && selectedIncomes !==0 && selectedExpenses !== null ? (
                    <>
                        <View style={styles.subCtn}>
                        <PieChart
                            data={chartData}
                            width={Dimensions.get('window').width - 20}
                            height={200}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            }}
                                accessor="amount"
                                backgroundColor="transparent"
                                paddingLeft="20"
                                center={[10, 10]}
                        />
                        </View>

                        <View style={styles.subCtn}>
                            <Text style={styles.itemName}>{advice}</Text>
                            <Text style={{fontStyle: 'italic'}}>Caution: We are making an assumption that any remaining income after spending on your needs and wants is considered as savings.</Text>
                        </View>
                    </>

                ): (
                    <View style={styles.subCtn}>
                        <Text style={styles.itemName}>No data for this month</Text>
                    </View>
                )}


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
        paddingBottom: 20,
    },
    subContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    subCtn: {
        paddingVertical: 20,
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
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
    },
    itemContainer: {
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '90%',
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
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#212529',
        paddingVertical: 20,
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

