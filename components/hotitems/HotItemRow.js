import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';

//Displays a row of the collection
function HotItemRow(props){
    return(
        <View onClick = {props.onClick} style = {styles.gamePanel}>
            <Number number={props.number}/>
            <Name name={props.name} />
            <Thumbnail thumbnail={props.thumbnail} />
            <YearPublished yearpublished={props.yearpublished} />
        </View>
    )
}

export default HotItemRow;

/* Components for a collection row */
function Number(props){
    return(
        <View>
            <Text>{props.number} </Text>
        </View>
    )
}
function Name(props){
    return(
        <View>
            <Text> {props.name} </Text>
        </View>
    )
}
function Thumbnail(props) {
    return(
        <View>
            <Image style = {styles.icon} source={{uri: props.thumbnail}}/>
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


/* End Components for Collection row */