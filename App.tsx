/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalContext from './src/context/GlobalContext';
import Main from './src/screens/Main'
import {Home} from './src/screens/Home'
import {Login, Register} from './src/screens/Login'

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    ...styles.screen,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GlobalContext.Provider value={}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          {/* <ScrollView */}
            {/* contentInsetAdjustmentBehavior="automatic"
            scrollEnabled={true} 
            contentContainerStyle={{flexGrow: 1}}
            style={backgroundStyle}> */}
              <Stack.Navigator initialRouteName='Main'>
                <Stack.Screen
                  name='Main' component={Main} options={{title: 'Welcome'}}
                />
                <Stack.Screen
                  name='Login' component={Login} options={{title: 'Login'}}
                />
                <Stack.Screen
                  name='Register' component={Register} options={{title: 'Register'}}
                />
                <Stack.Screen
                  name='Home' component={Home} options={{title: 'User main page'}}
                />
              </Stack.Navigator>
          {/* </ScrollView> */}
        </SafeAreaView>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
