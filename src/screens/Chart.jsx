import { useState, useContext, useEffect } from "react"
import { StyleSheet, View, Text, Dimensions, ImageBackground } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import GlobalContext from "../context/GlobalContext"
import { ChartContext } from "../components/TabBar"
import axios from "axios"


export const Chart = () => {
    const [chartIncome, setChartIncome] = useState(null)
    const [chartExpense, setChartExpense] = useState(null)
    const {tabClicked, setTabClicked} = useContext(ChartContext)
    console.log(tabClicked)
    const { URL, csrftoken } = useContext(GlobalContext)
    const headers = {headers: {
        'X-CSRFToken': csrftoken
    }}

    const getChartData = async () => {
        const colorIncome = [
            '#115f9a', '#1984c5', '#22a7f0', '#48b5c4', '#76c68f', '#a6d75b', '#c9e52f', '#d0ee11', '#d0f400'
        ]
        const colorExpense =[
            '#e84702', '#ee6600', '#f38000', '#f7990c', '#fab122', '#fcc838', '#fede50', '#fff469', '#ffe558', '#fff973'
        ]
        try {
            const incomeResponse = await axios.get(
              `${URL}/incomes/total/`,
                headers
            )
            console.log('INCOME by category: ', incomeResponse.data)

            const expenseResponse = await axios.get(
              `${URL}/expenses/total/`,
                headers
            )
            console.log('EXPENSE by category: ', expenseResponse.data)

            if (incomeResponse.data !== null) {
                const incomeData = incomeResponse.data.map((income, index) => ({
                    name: income.category,
                    amount: income.totalAmount,
                    color: colorIncome[index]
                }));
                setChartIncome(incomeData)
            }

            if (expenseResponse.data !== null) {
                const expenseData = expenseResponse.data.map((expense, index) => ({
                    name: expense.category,
                    amount: expense.totalAmount,
                    color: colorExpense[index]
                }));
                setChartExpense(expenseData)   
            }
            
        } catch (error) {
            console.log('GET CHART error: ', error)
        }
    }

    useEffect(() => {
        if (tabClicked) {
            getChartData()
            setTabClicked(false)
        }
        console.log(tabClicked, 'chart useEffect')
    }, [tabClicked])

    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/yYmxrWd/ffbghue-1.jpg" }}
            style={styles.backgroundImage}>
            {chartIncome !== null && chartExpense !== null ? (
                <View style={styles.container}>
                    <View style={styles.subCtn}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Income by Category</Text>
                        <PieChart
                            data={chartIncome}
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
                            //absolute
                        />
                    </View>
                    <View style={styles.subCtn}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Expense by Category</Text>
                        <PieChart
                            data={chartExpense}
                            width={Dimensions.get('window').width - 20}
                            height={200}
                            chartConfig={{
                                backgroundColor: 'transparent',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            }}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="20"
                            center={[10, 10]}
                            //absolute
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Text>Loading</Text>
                </View>
            )

            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    subCtn: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
})





