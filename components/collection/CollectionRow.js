import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';

//Displays a row of the collection
function CollectionRow(props){


    return(
        <View onClick = {props.onClick} style = {styles.gamePanel}>
            <GameName name = {props.name}/>
            <YearPublished yearpublished = {props.yearpublished}/>
            <GameImage image = {props.image}/>
            <GameStatus status = {props.status}/>
            <GamePlays numplays = {props.numplays}/>
            <GameComment comment = {props.comment}/>
        </View>
    )
}

export default CollectionRow;

/* Components for a collection row */
function GameName(props) {
    return(
        <View>
            <Text> {props.name} </Text>
        </View>
    )
}

function YearPublished(props){
    return(
        <View>
            <Text> {props.yearpublished} </Text>
        </View>
    )
}

function GameImage(props){
    return(
        <View>
            <Image style = {styles.icon} source={{uri: props.image}}/>
        </View>
    )
}

function GameStatus(props) {
    return(
        <View>
            <Text> {props.status} </Text>
        </View>
    )
}

function GamePlays(props) {
    return(
        <View>
            <Text> {props.numplays} </Text>
        </View>
    )
}

function GameComment(props) {
    return(
        <View>
            <Text> {props.comment} </Text>
        </View>
    )
}
/* End Components for Collection row */
