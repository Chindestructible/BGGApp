import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';
import Hyperlink from 'react-native-hyperlink'

//Displays a row of the collection
function GameRow(props){
    return(
        <View style = {styles.game}>
            <View style = {styles.gamePanel}>
                <Name name={props.name} />
                <YearPublished yearpublished={props.yearpublished} />
            </View>
            <Thumbnail thumbnail={props.thumbnail} />
            <Description description={props.description} />
            <Link link = {props.link}/>
        </View>
    )
}

export default GameRow;

/* Components for a collection row */
function Description(props){
    return(
        <View style = {styles.gamePanel}>
            <Text>{props.description} </Text>
        </View>
    )
}
function Name(props){
    return(
        <View>
            <Text>{props.name} </Text>
        </View>
    )
}
function Thumbnail(props) {
    return(
        <View>
            <Image style = {styles.image} source={{uri: props.thumbnail}}/>
        </View>
    )
}

function YearPublished(props){
    return(
        <View>
            <Text>Released:  {props.yearpublished} </Text>
        </View>
    )
}

function Link(props){
    return(
        <Hyperlink linkDefault={ true }>
            <Text>See it on BGG: {props.link} </Text>
      </Hyperlink>
    )
}


/* End Components for Collection row */