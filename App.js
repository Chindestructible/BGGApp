import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons, Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Collection from './components/collection/Collection';
import Game from './components/game/Game';
import HotItems from './components/hotitems/HotItems';
import style from './style';

const ROOT_URI = "https://www.boardgamegeek.com/xmlapi2/"

export default function App(){

  const Tap = createBottomTabNavigator();


  return (
    <NavigationContainer>
       <Tap.Navigator tabBarOptions={{
       activeTintColor: '#fff',
       inactiveTintColor: 'lightgray',
       activeBackgroundColor: '#c4461c',
       inactiveBackgroundColor: '#b55031',
           style: {
                 backgroundColor: '#CE4418',
                 paddingBottom: 3
           }
    }}>
         <Tap.Screen options={{
          tabBarLabel: 'Collection',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dice" size={24} color="black" />
          ),
        }} name = {"Collection"} component={Collection} />

        <Tap.Screen options={{
          tabBarLabel: 'Hot Items',
          tabBarIcon: ({ color, size }) => (
           <Icon icon="octicon:flame-24" />
          ),
        }} name = {"Hot Items"} component={HotItems} />


       </Tap.Navigator>
    </NavigationContainer>
  )
}







