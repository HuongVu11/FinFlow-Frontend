/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GlobalContext from './src/context/GlobalContext';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import Main from './src/screens/Main'
import { Login, Register } from './src/screens/Login'
import { AddExpense, AddIncome } from './src/screens/AddTransac';
import { EditIncome, EditExpense } from './src/screens/Edit';
import { IncomeDetail, ExpenseDetail } from './src/screens/Details';
import { HomeStack } from './src/components/HomeStack';
import axios from 'axios';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const MainStack = () => {
  return (
    <Drawer.Navigator 
      initialRouteName='Main'
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 240,
        },
        drawerLabelStyle: {
          color: '#212529',
          fontSize: 18,
          fontWeight: 500
        },
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen name='Main' component={Main} options={{ title: 'FINFLOW' }}/>
      <Drawer.Screen name='Login' component={Login} />
      <Drawer.Screen name='Register' component={Register} />
    </Drawer.Navigator>
  )
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    ...styles.screen,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const customTextProps = {
    style: {
      fontSize: 16,
      color: 'black'
    }
  };
  
  setCustomText(customTextProps);
  

  // const URL = 'http://10.0.2.2:8000'
  const URL = 'https://finflow.herokuapp.com'
  const [csrftoken, setCsrftoken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  console.log('token at App.tsx',csrftoken)
  console.log('app isauthenticated', isAuthenticated)

  const [incomes, setIncomes] = useState(null)
  const [expenses, setExpenses] = useState(null)
  const [balance, setBalance] = useState(0) 

  const headers = {headers: {
    'X-CSRFToken': csrftoken
  }}

  const fetchData = async () => {
    try {
      const incomesResponse = await axios.get(
        `${URL}/incomes/`,
        headers
      )
      console.log('INCOME: ', incomesResponse.data)

      const expensesResponse = await axios.get(
        `${URL}/expenses/`,
        headers
      )
      console.log('EXPENSES: ', expensesResponse.data)

      const balanceResponse = await axios.get(
        `${URL}/balance/`,
        headers
      )
      console.log('BALANCE: ', balanceResponse.data)

      setBalance(balanceResponse.data.balance)
      if (incomesResponse.data != null) {
        setIncomes(incomesResponse.data);
      }
      if (expensesResponse.data != null) {
        setExpenses(expensesResponse.data);
      }
    } catch (error) {
        console.log('GET USER DATA Error message: ', error)
  }} 

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GlobalContext.Provider value={{URL, csrftoken, setCsrftoken, isAuthenticated, setIsAuthenticated, fetchData, incomes, expenses, balance}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
              {isAuthenticated === false ? (
                <Stack.Group>
                  <Stack.Screen
                    name='MainStack' component={MainStack} options={{title: 'Welcome'}}
                  />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen
                    name='HomeStack' component={HomeStack} options={{title: 'User main page'}}
                  />
                  <Stack.Screen
                      name='AddIncome' component={AddIncome} options={{title: 'Add Income'}}
                  />
                  <Stack.Screen
                      name='AddExpense' component={AddExpense} options={{title: 'Add Expense'}}
                  />
                  <Stack.Screen
                      name='IncomeDetail' component={IncomeDetail} options={{title: 'Income Detail'}}
                  />
                  <Stack.Screen
                      name='ExpenseDetail' component={ExpenseDetail} options={{title: 'Expense Detail'}}
                  />
                  <Stack.Screen
                      name='EditIncome' component={EditIncome} options={{title: 'Edit'}}
                  />
                  <Stack.Screen
                      name='EditExpense' component={EditExpense} options={{title: 'Edit'}}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator> 
        </NavigationContainer>
      </GlobalContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default App;
