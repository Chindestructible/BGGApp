import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';
import GameRow from './GameRow';

import XMLParser from 'react-xml-parser';


const ROOT_URI = "http://localhost:8080/https://www.boardgamegeek.com/xmlapi/boardgame"


//Displays a specific game's details
function Game(props){

const [gameProperties, setGameProperties] = useState([]);
const [description, setDescription] = useState();
const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
        getGame(props.id);

  }, [])

  const getGame = async(id)=>{
    const response = await fetch(ROOT_URI + "/" + id, {method: "GET", headers: {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }}).then(res => res.text()).then(data => {
        //Parses XML
        var xml = new XMLParser().parseFromString(data); 
        var tempArray = []
       /* //Debugging
        console.log("Parsed XML: ")
        console.log(xml)
        console.log("Individual Rows: ")
        console.log(xml.children)
        console.log("Row")
        console.log(xml.children[0])
        console.log("Item")
        console.log(xml.children[0].children[0].value) */
        //Maps each child of the collection to an array
        xml.children.map(item => {tempArray.push(item); getDescription(item); getThumbnail(item)})
        //Set the collection state 
      //  tempArray.map(item => console.log(item.children[0].value))
        setGameProperties(tempArray);
    }).catch(err => console.log(err))
  }

  const getDescription = (game) => {
    game.children.forEach(item => { if(item.name === 'description'){
    console.log('found description: ' + item.value); setDescription(item.value)}});
  }

  const getThumbnail = (game) => {
    game.children.forEach(item => { if(item.name === 'thumbnail'){
    console.log('found thumbnail: ' + item.value); setThumbnail(item.value)}});
  }

    return(
        <View style = {styles.container}>
        <ScrollView behavior="padding" style={styles.innerView}>
             {gameProperties.length > 0 && <FlatList contentContainerStyle = {styles.container} keyExtractor={item => item.id} data={gameProperties} 
              renderItem={({item, index}) => <GameRow yearpublished = {item.children[0].value} name = {props.name} description = {description} thumbnail = {thumbnail} link = {props.link}/>}  /> }
        </ScrollView>
        </View>
    );
}

export default Game;

