import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons, Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { parse } from 'fast-xml-parser';
import XMLParser from 'react-xml-parser';

const ROOT_URI = "https://www.boardgamegeek.com/xmlapi2/"

export default function App(){

  const Tap = createBottomTabNavigator();

  return (
    <NavigationContainer>
       <Tap.Navigator>
         <Tap.Screen options={{
          tabBarLabel: 'Collection',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dice" size={24} color="black" />
          ),
        }} name = {"Collection"} component={Collection} />
       </Tap.Navigator>
    </NavigationContainer>
  )
}

/* Component for the Collection screen */
function Collection(){
  const [collection, setCollection] = useState([]);
  const onPress = (username) =>{
    getCollection(username)
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
        tempArray.map(item => console.log(item.children[0].value))
        setCollection(tempArray);
    }).catch(err => console.log(err))
  }

  return(
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerView}>
        <AddCollectionUsername onPress = {onPress} />
        <Text> {collection.length} </Text>
       {collection.length > 0 && <FlatList contentContainerStyle = {styles.container} keyExtractor={item => item.id} data={collection} 
          renderItem={({item}) => <CollectionRow name = {item.children[0].value} yearpublished = {item.children[1].value} image = {item.children[2].value} status = {item.children[4].value} numplays = {item.children[5].value} />} /> }
      </KeyboardAvoidingView>
    </View>
    )
}

//Displays a row of the collection
function CollectionRow(props){
    return(
        <View style = {styles.cityPanel}>
            <GameName name = {props.name}/>
            <YearPublished yearpublished = {props.yearpublished}/>
            <GameImage image = {props.image}/>
            <GameStatus status = {props.status}/>
            <GamePlays numplays = {props.numplays}/>
            <GameComment comment = {props.comment}/>
        </View>
    )
}

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


 //Contains the elements to add a username, a text input and a button
function AddCollectionUsername(props){
   
  const [username, setUsername] = useState("")

  let getText = (event)=>{
    setUsername(event.target.value)
  }

  return(
   <View style={styles.main}>
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
      <FontAwesomeIcon icon={faPlus} />
      </TouchableOpacity>
  </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    backgroundColor: '#EAEAEA',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40
  },icon:{
    width:50,
    height:50
  },addPanel:{
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 2
  },button: {
    alignItems: "center",
    backgroundColor: "#EAEAEA",
  },input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 2,
    padding: 3,
    margin: 5,
  },cityPanel:{
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 3,
    margin: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300
  }, innerView:{
    width:"70%",
    alignItems: 'center'
  }, currentWeather:{
    navigationOptions: {
        tabBarIcon: (tabInfo) => {
        return (
          <Feather
            name="calendar"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        )}
    }
  }
});