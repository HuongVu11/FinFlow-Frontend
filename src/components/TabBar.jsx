import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home } from '../screens/Home';
import { Chart } from '../screens/Chart';
import { Database } from '../screens/Database';
import { Report } from '../screens/Report';

const Tab = createBottomTabNavigator()

export const ChartContext = React.createContext();


export const TabBar = () => {
    const [tabClicked, setTabClicked] = useState(false)
    return (
        <ChartContext.Provider value={ {tabClicked, setTabClicked} }>
        <Tab.Navigator screenOptions= { ({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (route.name === 'Chart') {
                    iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                } else if (route.name === 'Report') {
                    iconName = focused ? 'analytics' : 'analytics-outline'
                } else if (route.name === 'Database') {
                    iconName = focused ? 'database' : 'database-outline'
                    return <MaterialCommunityIcons name={iconName} size={20} color={'#231942'} />;
                }
                return <Ionicons name={iconName} size={20} color={'#231942'} />;
            },
            tabBarStyle: {height: 60},
            headerShown: false,
            tabBarShowLabel: false,
        })} >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Chart" component={Chart} listeners={{tabPress: (e) => {setTabClicked(true)}}}/>
            <Tab.Screen name="Database" component={Database}/>
            <Tab.Screen name='Report' component={Report} />
        </Tab.Navigator>
    </ChartContext.Provider>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
})