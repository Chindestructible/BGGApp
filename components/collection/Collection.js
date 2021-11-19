import XMLParser from 'react-xml-parser';
import CollectionRow from './CollectionRow';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from '../../style';
import Game from '../game/Game';
import { AsyncStorage } from '@react-native-async-storage/async-storage'


const ROOT_URI = "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/"

/* Component for the Collection screen */
function Collection(navigation){
  const [collection, setCollection] = useState([]);
  const [gameClicked, setGameClicked] = useState(false);
  const [gameId, setGameId] = useState();
  const [gameName, setGameName] = useState();
  const [userName, setUserName] = useState("")

  useEffect(() => {
       // ON screen startup, look for username
       let username = localStorage.getItem('collectionOwner');
       console.log("Username: " + username);
       if(username.length > 2){
         getCollection(username);
       }
       else{
         localStorage.setItem('collectionOwner', "");
       }
  }, [])

  

  const onPress = (username) =>{
   if(username.length > 2){
        getCollection(username)
        setUserName(username);
    }
  }

  const clear = () => {
        setCollection([]);
        localStorage.setItem('collectionOwner', "");
  }


  const getGame = async(id, name) => {
    //Sets gameClicked boolean to true, which hides the collection and shows a specific game detail
    setGameClicked(true);
    setGameId(id);
    setGameName(name);
  }

  const writeCollection = async() => {
  //When user hits save session, this stores the current collection's username and stashes it
    if(userName.length > 2){
        await localStorage.setItem('collectionOwner', userName).catch(err => {console.log(err);})
    }
  }



  const getCollection = async(username)=>{
    const response = await fetch(ROOT_URI + "collection?username=" + username).then(res => res.text()).then(data => {
        //Parses XML
        var xml = new XMLParser().parseFromString(data); 

        //Debugging
       /*console.log("Parsed XML: ")
       console.log(xml)
        console.log("Individual Rows: ")
        console.log(xml.children)
        console.log("Specific Item")
        console.log(xml.children[0].children)
        console.log("Name ")
        console.log(xml.children[0].children[0].value) */
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
     {!gameClicked && 
        <ScrollView behavior="padding" style={styles.innerView}>
        <AddCollectionUsername onPress = {onPress} clear = {clear} />
       {collection.length > 0 && <FlatList contentContainerStyle = {styles.container} keyExtractor={item => item.id} data={collection} 
          renderItem={({item}) => <CollectionRow onClick={() => getGame(item.attributes.objectid, item.children[0].value)} name = {item.children[0].value} yearpublished = {item.children[1].value} image = {item.children[2].value} status = {item.children[4].value} numplays = {item.children[5].value} />} /> }
         </ScrollView>
      }

      {!gameClicked && <DownloadCollection onPress = {writeCollection}/>}


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

function DownloadCollection(props){
  return(
   <View style={styles.game}>
      <TouchableOpacity
       style = {styles.button}
        href={"#" }
        onPress={
          ()=>{
            props.onPress()
          }
        }
      >
      <Text> Save Session </Text>
      </TouchableOpacity>
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
   <View style={styles.game}>
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