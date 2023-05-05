import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Logout } from './Logout';
import { TabBar } from './TabBar';

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} >
            <Drawer.Screen name='TabBar'component={TabBar} /> 
      </Drawer.Navigator>
    )

}

export const HomeStack = () => {
    return (
        <Drawer.Navigator drawerContent={Logout} >
            <Drawer.Screen name='HomeDrawer' component={HomeDrawer} options={{ title: '' }} />
        </Drawer.Navigator>
    )

    // return (
    //     <Drawer.Navigator >
    //         <Drawer.Screen name='HomeDrawer' component={HomeDrawer} options={{ title: '' }} />
    //         <Drawer.Screen name='Logout'component={Logout} /> 
    //     </Drawer.Navigator>
    // )
}


