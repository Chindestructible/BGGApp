import XMLParser from 'react-xml-parser';
import CollectionRow from './CollectionRow';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';
import Game from '../game/Game';


const ROOT_URI = "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/"

/* Component for the Collection screen */
function Collection(navigation){
  const [collection, setCollection] = useState([]);
  const [gameClicked, setGameClicked] = useState(false);
  const [gameId, setGameId] = useState();
  const [gameName, setGameName] = useState();

  const onPress = (username) =>{
    getCollection(username)
  }


  const getGame = async(id, name) => {
    setGameClicked(true);
    setGameId(id);
    setGameName(name);
  }

  const getCollection = async(username)=>{
    const response = await fetch(ROOT_URI + "collection?username=" + username).then(res => res.text()).then(data => {
        //Parses XML
        var xml = new XMLParser().parseFromString(data); 

        //Debugging
       console.log("Parsed XML: ")
       console.log(xml)
        console.log("Individual Rows: ")
        console.log(xml.children)
        console.log("Specific Item")
        console.log(xml.children[0].children)
        console.log("Name ")
        console.log(xml.children[0].children[0].value)
        var tempArray = [];
        //Maps each child of the collection to an array
        xml.children.map(item => tempArray.push(item))
        //Set the collection state 
       // tempArray.map(item => console.log(item.children[0].value))
        setCollection(tempArray);
        
    }).catch(err => console.log(err))
  }

  return(
    <View style={styles.container}>
     {!gameClicked && <ScrollView behavior="padding" style={styles.innerView}>
        <AddCollectionUsername onPress = {onPress} />
       {collection.length > 0 && <FlatList contentContainerStyle = {styles.container} keyExtractor={item => item.id} data={collection} 
          renderItem={({item}) => <CollectionRow onClick={() => getGame(item.attributes.objectid, item.children[0].value)} name = {item.children[0].value} yearpublished = {item.children[1].value} image = {item.children[2].value} status = {item.children[4].value} numplays = {item.children[5].value} />} /> }
      </ScrollView> }

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

        <Game id = {gameId} name = {gameName} link = {"https://boardgamegeek.com/boardgame/" + gameId} />
      </View>
      }
    </View>
    );
}

 //Contains the elements to add a username, a text input and a button
function AddCollectionUsername(props){
   
  const [username, setUsername] = useState("")

  let getText = (event)=>{
    setUsername(event.target.value)
  }

  return(
   <View style={styles.container}>
      <TextInput style = {styles.input} type={"text"} name={"city_text"} placeholder={"BGG Username"} id={"city_text"} onChange={getText} value={username}/>
      <TouchableOpacity
       style = {styles.button}
        href={"#" }
        onPress={
          ()=>{
            props.onPress(username)
          }
        }
      >
      <Text> Go </Text>
      </TouchableOpacity>
  </View>
    );
}

export default Collection;