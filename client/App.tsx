import React from 'react';
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home'
import Details from './screens/Details'

type RootStackParamList = {
  Home: undefined,
  Details: {
    id: string
  }
}

const RootStack  = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions = {{
          headerStyle: {
            backgroundColor: "#009387",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: 'center'
        }}
        initialRouteName="Home"
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Details" component={Details} />
      </RootStack.Navigator>
    </NavigationContainer>
  )

}

export default App

const styles = StyleSheet.create({})
