import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';
import XMLParser from 'react-xml-parser';
import HotItemRow from './HotItemRow';
import Game from '../game/Game';


const ROOT_URI = "https://www.boardgamegeek.com/xmlapi2/"

//Displays the current hot Items
function HotItems(props){

const [hotItems, setHotItems] = useState([]);
const [gameId, setGameId] = useState();
const [gameName, setGameName] = useState();
const [gameClicked, setGameClicked] = useState(false);

useEffect(() => {
        getGames();
  }, [])

   const getGame = async(id, name) => {
    setGameClicked(true);
    setGameId(id);
    setGameName(name);
  }

  const getGames = async()=>{
    const response = await fetch(ROOT_URI + "hot?type=boardgame" + name).then(res => res.text()).then(data => {
        //Parses XML
        var xml = new XMLParser().parseFromString(data); 

        //Debugging
        console.log("Parsed XML: ")
        console.log(xml)
        /*console.log("Individual Rows: ")
        console.log(xml.children)
        console.log("Specific Item")
        console.log(xml.children[0].children[1].attributes.value)*/
        //Maps each child of the collection to an array
        var tempArray = [];
        xml.children.map(item => tempArray.push(item))
        //Set the collection state 
        //tempArray.map(item => console.log(item.children[0].value))
        setHotItems(tempArray);
    }).catch(err => console.log(err))
  }

    return(
        <View style = {styles.container}>
        {!gameClicked && <ScrollView behavior="padding" style={styles.innerView}>
             {hotItems.length > 0 && <FlatList contentContainerStyle = {styles.container} keyExtractor={item => item.id} data={hotItems} 
              renderItem={({item, index}) => <HotItemRow onClick={() => getGame(item.attributes.id, item.children[1].attributes.value)} number = {'#' + (index + 1)} thumbnail = {item.children[0].attributes.value} name = {item.children[1].attributes.value} yearpublished = {item.children[2].attributes.value} />} /> }
        </ScrollView>
        }

         {gameClicked && <View style = {styles.container}> 
        <TouchableOpacity
        style = {styles.button}
        href={"#" }
        onPress={
            ()=>{
            setGameClicked(!gameClicked)
            }
        }
        >
        
      <Text> Back </Text>
      </TouchableOpacity>

        <Game id = {gameId} name = {gameName} link = {"https://boardgamegeek.com/boardgame/" + gameId}  />
      </View>
      }

        </View>
    );
}

export default HotItems;

